import { Component, OnInit } from '@angular/core';
import { AvionService } from '../services/avion.service';
import { Avion } from '../model/avion.model';
import {Company} from "../model/company.model";
import {AuthService} from "../services/auth.service";
import {Image} from "../model/image.model";
@Component({
  selector: 'app-avions',
  templateUrl: './avions.component.html',
  styleUrls: ['./avions.component.css']
})
export class AvionsComponent implements OnInit {
  avions!: Avion[];
  company!:Company[];
  apiURL: string = 'http://localhost:8082/avions/api';

  constructor(private avionService: AvionService,public authService: AuthService) {
  }

  ngOnInit(): void {
    this.chargerAvions();
  }
  chargerAvions(){
    this.avionService.listeAvions().subscribe(avs => {
      this.avions = avs;
    });
  }

  supprimerAvion(a: Avion) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.avionService.supprimerAvion(a.idAvions!).subscribe(() => {
        console.log("avion supprimé");
        this.chargerAvions();
      });
  }
}
