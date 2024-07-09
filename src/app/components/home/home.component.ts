import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { StarwarService } from 'src/app/service/starwar.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ICharacter, IFilm, IPage, ISpecies, IStarship, IVehicle } from 'src/app/model';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, share, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  characters: ICharacter[] = [];
  pageData!: IPage;
  filteredCharacters = new MatTableDataSource<any>();
  birthYears: string[] = ['All', 'BBY 20'];
  selectedMovie: string[] = [];
  selectedSpecies: string[] = [];
  selectedVehicle: string[] = [];
  selectedStarship: string[] = [];
  selectedBirthYear: string[] = [];
  displayedColumns: string[] = ['slNo', 'name', 'species', 'birthYear'];
  currentPage!: any ;
  nextPage!: string | null;
  prevousPage!: string | null;
  selectedBirthYearRange: { start: string, end: string } = { start: 'All', end: 'All' };
  currentUrl: any;

  films$: Observable<any[]>=this.starwar.getFilms().pipe(map(data => data.results));
  speciesList$: Observable<any[]>=this.starwar.getSpecies().pipe(map(res => res.results), shareReplay(1));
  vehicles$: Observable<any[]>=this.starwar.getVehicles().pipe(map(data => data.results));
  starships$: Observable<any[]>=this.starwar.getStarships().pipe(map(data => data.results));
  constructor(private starwar: StarwarService, private router: Router) {
    
    //localStorage.setItem('current',this.currentPage);
  }

  ngOnInit(): void {
    this.currentPage=this.starwar.getPage();
    this.getPages(this.currentPage)
    
  }

  getPages(currentPage: any) {
    this.starwar.getByPage(currentPage).subscribe((data: IPage) => {
      this.pageData = data;
      this.nextPage = data.next!=null? data.next.split("=")[1] : data.next;
      this.prevousPage = data.previous!=null? data.previous.split("=")[1] : data.previous;
      this.characters = data.results;
      this.applyFilters();
    });
  }

  next() {
    if (this.nextPage) {
      this.currentPage = Number(this.nextPage);
      this.getPages(this.nextPage);
      //localStorage.setItem('current',this.currentPage);
      this.starwar.setPage(this.currentPage)
    }
  }

  previous() {
    if (this.prevousPage) {
      this.currentPage = Number(this.prevousPage);
      this.getPages(this.prevousPage);
      this.starwar.setPage(this.currentPage)
      //localStorage.setItem('current',this.currentPage);
    }
  }

  filterCharacters(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredCharacters.data = this.characters.filter(character =>
      this.matchMovie(character) &&
      this.matchSpecies(character) &&
      this.matchVehicle(character) &&
      this.matchStarship(character)
    );
  }

  private matchMovie(character: ICharacter): boolean {
    return this.selectedMovie.length === 0 || character.films.some(film => this.selectedMovie.includes(film));
  }

  private matchSpecies(character: ICharacter): boolean {
    return this.selectedSpecies.length === 0 || character.species.some(species => this.selectedSpecies.includes(species));
  }

  private matchVehicle(character: ICharacter): boolean {
    return this.selectedVehicle.length === 0 || character.vehicles.some(vehicle => this.selectedVehicle.includes(vehicle));
  }

  private matchStarship(character: ICharacter): boolean {
    return this.selectedStarship.length === 0 || character.starships.some(starship => this.selectedStarship.includes(starship));
  }

  getSpeciesName(url: string): Observable<string> {
    return this.speciesList$.pipe(
      map(speciesList => {
        const species = speciesList.find(species => species.url === url);
        return species ? species.name : 'unknown';
      })
    );
  }

  selectCharacter(character: ICharacter, id: any): void {
    this.router.navigate(['/profile', character.url.split('/')[5]]);
  }
}

