import {Component, Injectable, OnInit} from '@angular/core';
import {Game} from '../game/game.model';
import {GameService} from '../game/game.service';
import {PlayerService} from '../player/player.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})

@Injectable()
export class SummaryComponent implements OnInit {
  game: Game;
  summary: any;


  constructor(private gameService: GameService,
              private playerService: PlayerService,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.gameService.gameSubject.subscribe(result => {
      this.game = result as Game;
      localStorage.setItem('game', JSON.stringify(this.game));
    });
    this.game = JSON.parse(localStorage.getItem('game')) as Game;
    console.log(this.game);
    this.gameService.getGameSummary(this.game.gameUrl).subscribe(result => {
      this.summary = result;
      localStorage.setItem('summary', JSON.stringify(this.summary));
    });
    console.log('init summary: ' + localStorage.getItem('summary'));

    // const refresh = window.setInterval(() => {
    //   window.location.reload();
    // }, 12000);
    // if (this.isValid()) {
    //   window.clearInterval(refresh);
    // }

  }

  onPlayer1History() {
    this.router.navigate(['/players/' + this.game.player1.username + '/history']);
  }

  onPlayer2History() {
    this.router.navigate(['/players/' + this.game.player2.username + '/history']);
  }

  isValid() {
    return this.game.player2.username !== 'Waiting for player to join';
  }

  validRestart() {
    return this.isValid() && this.game.player1.username;
  }
}
