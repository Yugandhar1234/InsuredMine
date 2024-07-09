import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, map, of, shareReplay, switchMap } from 'rxjs';
import { ICharacter } from 'src/app/model';
import { StarwarService } from 'src/app/service/starwar.service';
interface CharacterData {
  films: any[];
  vehicles: any[];
  starships: any[];
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  character!: ICharacter;
  characterId!: number;
  filmsData: any[] = [];
  vehiclesData: any[] = []
  starshipData: any[] = [];
  characterData$!: Observable<CharacterData>;
  constructor(private activateRoute: ActivatedRoute, private router: Router, private starwar: StarwarService) {
    // const navigation=this.router.getCurrentNavigation();
    // if(navigation?.extras.state){
    //   const character=navigation.extras.state['data'];
    //   console.log('s',character)
    // }
    activateRoute.params.subscribe(res => {
      this.characterId = res['id'];
      //console.log(this.characterId)
    })
  }
  ngOnInit(): void {
    this.getCharacter()
  }
  getCharacter() {
    this.characterData$ = this.starwar.getCharacter(this.characterId).pipe(
      switchMap(character => {
        this.character = character;
        return forkJoin({
          films: this.fetchData(character.films, this.starwar.getFilm.bind(this.starwar)),
          vehicles: this.fetchData(character.vehicles, this.starwar.getVehicle.bind(this.starwar)),
          starships: this.fetchData(character.starships, this.starwar.getStarship.bind(this.starwar))
        }).pipe(shareReplay());
      })
    );
  }

  fetchData(items: string[], fetchFunction: (id: string) => Observable<any>): Observable<any[]> {
    if (items && items.length > 0) {
      const observables$ = items.map(url => {
        const id = url.split('/').slice(-2, -1)[0];
        return fetchFunction(id);
      });
      return forkJoin(observables$);
    } else {
      return of([]);
    }
  }
  backTo(){
    this.router.navigateByUrl('/');
  }
}
