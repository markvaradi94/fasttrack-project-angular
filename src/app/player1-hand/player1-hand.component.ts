import {Component, OnInit} from '@angular/core';
import {GameService} from '../game/game.service';
import {Game} from '../game/game.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Player} from '../player/player.model';

@Component({
  selector: 'app-player1-hand',
  templateUrl: './player1-hand.component.html',
  styleUrls: ['./player1-hand.component.css']
})
export class Player1HandComponent implements OnInit {
  url: string;
  game: Game;
  GAME_API: string;
  player1: Player;

  constructor(private gameService: GameService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.url = localStorage.getItem('url');
    this.GAME_API = 'localhost:4200/games/' + this.url;
    // this.gameService.gameSubject.subscribe(result => {
    //   localStorage.setItem('game', JSON.stringify(result));
    // });
    // this.game = JSON.parse(localStorage.getItem('game')) as Game;
    // console.log(this.game);
    this.game = JSON.parse(localStorage.getItem('game')) as Game;
    console.log(this.game);
    this.player1 = JSON.parse(localStorage.getItem('player1')) as Player;
    console.log(this.player1);
    // this.gameService.getGameByUrl(this.url).subscribe(data => {
    //     this.setGame(data);
    //     this.gameService.gameSubject.next(this.game);
    //     localStorage.setItem('game', JSON.stringify(this.game));
    //     console.log('game inside subscription: ' + localStorage.getItem('game'));
    //   }
    // );
    // this.gameService.gameSubject.subscribe(result => {
    //   this.game = result as Game;
    // });
    // console.log('outside subscription: ' + JSON.stringify(this.game));
  }

  setGame(game: Game) {
    this.game = game;
  }

  getGame() {
    return this.game;
  }

  onRock() {
    this.gameService.pickPlayer1Hand(this.url, 'ROCK').subscribe(data => {
      this.gameService.gameSubject.next(data as Game);
    });
    this.gameService.gameSubject.subscribe(result => {
      localStorage.setItem('game', JSON.stringify(result));
      this.setGame(result);
      console.log(localStorage.getItem('game'));
      console.log(this.game);
      this.router.navigate(['/games/' + this.url + '/summary'], {relativeTo: this.route});
    });
  }

  onPaper() {
    this.gameService.pickPlayer1Hand(this.url, 'PAPER').subscribe(data => {
      this.gameService.gameSubject.next(data as Game);
    });
    this.gameService.gameSubject.subscribe(result => {
      localStorage.setItem('game', JSON.stringify(result));
      this.setGame(result);
      console.log(localStorage.getItem('game'));
      console.log(this.game);
      this.router.navigate(['/games/' + this.url + '/summary'], {relativeTo: this.route});
    });
  }

  onScissors() {
    this.gameService.pickPlayer1Hand(this.url, 'SCISSORS').subscribe(data => {
      this.gameService.gameSubject.next(data as Game);
    });
    this.gameService.gameSubject.subscribe(result => {
      localStorage.setItem('game', JSON.stringify(result));
      this.setGame(result);
      console.log(localStorage.getItem('game'));
      console.log(this.game);
      this.router.navigate(['/games/' + this.url + '/summary'], {relativeTo: this.route});
    });
    console.log(localStorage.getItem('game'));
  }

  copyGameUrl(customUrl) {
    customUrl.select();
    document.execCommand('copy');
    customUrl.setSelectionRange(0, 0);
  }
}
