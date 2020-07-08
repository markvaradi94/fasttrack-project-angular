import {Component, OnInit} from '@angular/core';
import {Game} from '../game/game.model';
import {PlayerService} from '../player/player.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Player} from '../player/player.model';
import {GameService} from '../game/game.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  player: Player;
  url: string;
  game: Game;

  constructor(private playerService: PlayerService,
              private gameService: GameService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    console.log('current username: ' + username);
    this.playerService.getPlayerByUsername(username).subscribe(result => {
      this.player = result;
      localStorage.setItem('currentPlayer', JSON.stringify(this.player));
      console.log('currentPlayer: ' + localStorage.getItem('currentPlayer'));
    });
    this.player = JSON.parse(localStorage.getItem('currentPlayer')) as Player;
    console.log('player after subscription: ' + JSON.stringify(this.player));
  }

  onStartNewGame() {
    console.log(this.player);
    this.gameService.addGame(
      new Game(
        new Player(this.player.username),
        new Player('Waiting for player to join')
      )
    )
      .subscribe(data => {
        this.game = data as Game;
        this.gameService.gameSubject.next(this.game);
        // localStorage.setItem('game', JSON.stringify(this.game));
        this.setUrl(data.gameUrl);
        localStorage.setItem('url', this.url);
        console.log('url from sub: ' + this.url);
        this.router.navigate(['/games/' + this.url + '/player/1']);
      }, error => console.error(error));
    this.gameService.gameSubject.subscribe(data => {
      this.game = data as Game;
      localStorage.setItem('game', JSON.stringify(this.game));
      console.log('game from subject: ' + JSON.stringify(this.game));
    });
    // this.url = localStorage.getItem('url');
    // this.url = localStorage.getItem('url');
    // console.log('saved url: ' + this.url);
    // console.log('game after subject: ' + JSON.stringify(this.game));
    // this.router.navigate(['/games/' + this.url + '/player/1']);
  }

  setUrl(url: string) {
    this.url = url;
  }

}
