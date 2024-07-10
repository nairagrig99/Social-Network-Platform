import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: WebSocket;
  private subject: Subject<any>;

  constructor() {
    this.subject = new Subject<any>();
  }

  connect(userId: string) {
    // this.socket = new WebSocket('ws://localhost:3000');
    console.log('connect')
    this.socket.onopen = () => {
      this.socket.send(JSON.stringify({type: 'register', userId}));
    };

    this.socket.onmessage = (event) => {
      this.subject.next(JSON.parse(event.data));
    };

    this.socket.onclose = () => {
      // setTimeout(() => this.connect(userId), 1000);
    };
  }

  getMessages(): Observable<any> {
    return this.subject.asObservable();
  }

  sendMessage(message: any) {
    this.socket.send(JSON.stringify(message));
  }
}
