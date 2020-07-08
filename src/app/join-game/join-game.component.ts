import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PlayerService} from '../player/player.service';
import {GameService} from '../game/game.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Game} from '../game/game.model';
import {Player} from '../player/player.model';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {
  joinForm: FormGroup;
  game: Game;
  player2: Player;
  url: string;

  constructor(private playerService: PlayerService,
              private gameService: GameService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.joinForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(4)])
    });
    this.url = localStorage.getItem('url');
    console.log(this.url);
  }

  onAddPlayer2ToGame() {
    // this.playerService.addPlayer(this.joinForm.value).subscribe(result => {
    //   this.player = result;
    //   this.game = JSON.parse(localStorage.getItem('game'));
    //   this.game.player2 = this.player;
    //   localStorage.setItem('game', JSON.stringify(this.game));
    //   localStorage.setItem('player2', JSON.stringify(this.player));
    // });

    this.gameService.addPlayer2(this.url, this.joinForm.value.username).subscribe(result => {
      this.game = result;
      this.player2 = result.player2;
      console.log('player2: ' + JSON.stringify(this.player2));
      this.gameService.gameSubject.next(this.game);
      // localStorage.setItem('game', JSON.stringify(this.game));
      // localStorage.setItem('player2', JSON.stringify(this.player));
      console.log('player 2 from service: ' + JSON.stringify(this.player2));
      console.log('game from service: ' + this.game);
      this.onJoinGame();
    });
    // this.gameService.gameSubject.subscribe(result => {
    //   localStorage.setItem('player2', JSON.stringify(result));
    //   localStorage.setItem('url', result.gameUrl);
    //   console.log('player2 from subject: ' + JSON.stringify(result));
    // });
  }

  onJoinGame() {
    console.log(this.player2);
    console.log(this.game);
    localStorage.setItem('player2', JSON.stringify(this.player2));
    localStorage.setItem('url', this.game.gameUrl);
    localStorage.setItem('game', JSON.stringify(this.game));
    this.router.navigate(['/games/' + this.url + '/player/2'], {relativeTo: this.route});
  }

}
