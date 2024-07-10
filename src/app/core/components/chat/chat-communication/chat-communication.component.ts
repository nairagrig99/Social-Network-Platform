import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AuthUserInterface} from "@auth/interface/auth-user.interface";
import {socket} from "@app/core/components/chat/socket-io";
import {BehaviorSubject} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {SvgIcon} from "@app/shared/input-calendar/input-calendar-window/base-mixin";
import {ToggleStateEnum} from "@app/shared/enums/toogle-state.enum";
import {AuthService} from "@auth/service/auth.service";

@Component({
  selector: 'app-chat-communication',
  templateUrl: './chat-communication.component.html',
  styleUrl: './chat-communication.component.scss',
  animations: [
    trigger('chatAnimation', [
      state('down', style({
        bottom: '-330px'
      })),
      state('up', style({
        bottom: '0px',

      })),
      transition('up <=> down', [
        animate('0.5s ease-in-out')
      ])
    ])
  ]
})
export class ChatCommunicationComponent extends SvgIcon(class {
}) implements OnInit, AfterViewChecked {

  @ViewChild('scroll') private scrollContainer!: ElementRef;
  @ViewChild('close') private close!: ElementRef;

  @Input() userCommunication!: AuthUserInterface;
  @Input() currentUser!: AuthUserInterface;

  public user$: BehaviorSubject<AuthUserInterface> = new BehaviorSubject<AuthUserInterface>(this.userCommunication)
  public userName!: string;
  public message!: string;
  public canDeactivate: boolean = false;
  public direction = ToggleStateEnum;
  public chatAppState = this.direction.UP;
  public messageList: { message: string, userName: string, mine: boolean }[] = [];

  constructor() {
    super();
    this.svgIconShow('arrow')
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
          });
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
      this.messageList.push({message: data.content, userName: data.from, mine: false});
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

  public closeChat(): void {
    this.chatAppState = this.chatAppState === this.direction.UP ? this.direction.DOWN : this.direction.UP;
    if (this.chatAppState === this.direction.UP) {
      this.close.nativeElement.style.transform = 'rotate(0deg)';
    } else {
      this.close.nativeElement.style.transform = 'rotate(180deg)';
    }

  }
}
