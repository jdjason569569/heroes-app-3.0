import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor(private activatedRoute: ActivatedRoute,private heroesService: HeroesService, private route: Router) { }  //ActivatedRoute : Permite leer los parametros que vienen en la URL

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(({id})=>{
    //   id
    // });
    this.activatedRoute.params.pipe(
    switchMap(params => this.heroesService.getHeroById(params.id)))
    .subscribe((heroe)=>{
              this.heroe = heroe;
    })
  }

  regresar(){
    this.route.navigate(['/heroes/listado']);
  }

}
