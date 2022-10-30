import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

/**
 * Toast service class
 * This class provides methods to add single, multiple alerts as a toast
 */
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(
    private messageService: MessageService,
    private translateService: TranslateService) { }

  info(detail: string, sticky?: boolean, key?: string): void {
    this.translateService.get('Common.Toast.Info')
      .subscribe({
        next: str => {
          this.addSingle('info', str, detail, sticky, key);
        }
      });
  }

  success(detail: string, sticky?: boolean, key?: string): void {
    this.translateService.get('Common.Toast.Success')
      .subscribe({
        next: str => {
          this.addSingle('success', str, detail, sticky, key);
        }
      });
  }

  warn(detail: string, sticky?: boolean, key?: string): void {
    this.translateService.get('Common.Toast.Warn')
      .subscribe({
        next: str => {
          this.addSingle('warn', str, detail, sticky, key);
        }
      });
  }

  error(detail: string, key?: string): void {
    this.translateService.get('Common.Toast.Error')
      .subscribe({
        next: str => {
          this.addSingle('error', str, detail, true, key);
        }
      });
  }

  /**
   * add single toast message
   * @param severity Severity level of the message, valid values are "success", "info", "warn" and "error"
   * @param summary Summary text of the message.
   * @param detail Detail text of the message.
   * @param sticky Whether the message should be automatically closed based on life property or kept visible.
   * @param key Key of the message in case message is targeted to a specific toast component.
   */
  addSingle(severity: string, summary: string, detail: string, sticky?: boolean, key?: string): void {
    this.messageService.add({
      severity,
      summary,
      detail,
      sticky,
      key
    });
  }

  /**
   * add multiple toast messages
   * @param messages array of message type {severity:'success', summary:'Service Message', detail:'Via MessageService'}
   */
  addMultiple(messages: any): void {
    this.messageService.addAll(messages);
  }

  /**
   * clear all toast messages
   */
  clear(): void {
    this.messageService.clear();
  }
}
