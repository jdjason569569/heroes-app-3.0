import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  title!: string


  constructor(private heroeService: HeroesService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    if(!this.router.url.includes('editar')){
      this.title = 'Crear heroe';
      return;
    }

    this.activatedRoute.params.pipe(
      switchMap(({id})=> this.heroeService.getHeroById(id))
    ).subscribe(heroe => {
      this.heroe = heroe;
      this.title = 'Editar heroe';
    }, (error)=>{
      
    });


  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0){
      return;
    }
    if(this.heroe.id){
      this.heroeService.actualizarHeroe(this.heroe).subscribe(heroe=>{
        console.log('Actualizando heroe -> ', heroe);
      });
    }else{
      this.heroeService.agregarHeroe(this.heroe).subscribe((response)=>{
       console.log(response);
       this.router.navigate(['/heroes/editar', response.id]);
       });
    }
  }

  borrar(){
      this.heroeService.borarHeroe(this.heroe.id!).subscribe(resp=>{
      this.router.navigate(['/heroes']);
      });
  }

}
