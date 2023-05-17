import { Component, OnInit } from '@angular/core';
import { AvionService } from '../services/avion.service';
import { Avion } from '../model/avion.model';
import { ActivatedRoute,Router } from '@angular/router';
import { Company } from '../model/company.model';
import {Image} from "../model/image.model";
@Component({
  selector: 'app-update-avion',
  templateUrl: './update-avion.component.html',
  styles: [
  ]
})
export class UpdateAvionComponent implements OnInit {
  company! : Company[];
  updatedComId! : number;
  currentAvion = new Avion();
  myImage! : string;
  uploadedImage!: File;
  isImageUpdated: Boolean=false;
  constructor(private activatedRoute: ActivatedRoute,
    private router :Router,
  private avionService: AvionService) { }
  ngOnInit(): void {
    this.avionService.listeCompany().
    subscribe(cats => {console.log(cats);
        this.company = cats;
      }
    );
    this.avionService.consulterAvion(this.activatedRoute.snapshot.params['id'])
      .subscribe( av =>{ this.currentAvion = av;
        this.updatedComId = av.company.idCom;
      } ) ;
  }
  onAddImageAvion() {
    this.avionService
      .uploadImageAv(this.uploadedImage,
        this.uploadedImage.name,this.currentAvion.idAvions)
      .subscribe( (img : Image) => {
        this.currentAvion.images.push(img);
      });
  }
  supprimerImage(img: Image){
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.avionService.supprimerImage(img.idImage).subscribe(() => {
//supprimer image du tableau currentProduit.images
        const index = this.currentAvion.images.indexOf(img, 0);
        if (index > -1) {
          this.currentAvion.images.splice(index, 1);
        }
      });
  }
  updateAvion() {
    this.currentAvion.company = this.company.find(cat => cat.idCom ==
      this.updatedComId)!;
    this.avionService
      .updateAvion(this.currentAvion)
      .subscribe((prod) => {
        this.router.navigate(['avions']);
      });
  }
  onImageUpload(event: any) {
    if(event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated =true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => { this.myImage = reader.result as string; };
    }
  }

}
