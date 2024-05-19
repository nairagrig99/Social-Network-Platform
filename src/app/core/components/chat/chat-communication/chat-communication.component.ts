import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AuthUserInterface} from "@auth/interface/auth-user.interface";
import {socket} from "@app/core/components/chat/socket-io";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-chat-communication',
  templateUrl: './chat-communication.component.html',
  styleUrl: './chat-communication.component.scss'
})
export class ChatCommunicationComponent implements OnInit, AfterViewChecked {

  @ViewChild('scroll') private scrollContainer!: ElementRef;

  @Input() userCommunication!: AuthUserInterface;
  @Input() currentUser!: AuthUserInterface;
  public user$: BehaviorSubject<AuthUserInterface> = new BehaviorSubject<AuthUserInterface>(this.userCommunication)
  public userName: string = ''
  public message: string = '';
  public canDeactivate: boolean = false;
  messageList: { message: string, userName: string, mine: boolean }[] = [];

  constructor() {
  }

  ngOnInit(): void {

    this.user$.next(this.userCommunication);
    this.userNameUpdate(this.userCommunication.name);
  }

  ngAfterViewChecked() {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight
  }

  public userNameUpdate(username: string) {
    socket.disconnect()
    this.userName = username;
    socket.auth = {username};
    socket.connect();

    socket.on("users", (users: any) => {
      users.forEach((user: any) => {
        if (user.username === this.currentUser.name) {
          this.user$.next({
            ...this.userCommunication,
            userID: user.userID
          })
        }
      })
    });

    socket.on('user connected', (data: any) => {
      if (data.username === this.currentUser.name) {
        this.user$.next({
          ...this.userCommunication,
          userID: data.userID
        })
        this.messageList.push({message: data.message, userName: this.userName, mine: false})
      }
    })

    socket.on("private message", (data: any) => {
      this.messageList.push({message: data.content, userName: data.from, mine: false})
    })

  }

  public sendMessage(userID: string): void {
    const content = this.message;
    socket.emit("private message", {
      content,
      to: userID,
    });

    this.messageList.push({
      message: content,
      userName: this.userCommunication.name,
      mine: true,
    });

    this.message = '';
  }
}
