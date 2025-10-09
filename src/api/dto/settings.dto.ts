export class SettingsDto {
  rejectCall?: boolean;
  msgCall?: string;
  groupsIgnore?: boolean;
  alwaysOnline?: boolean;
  readMessages?: boolean;
  readStatus?: boolean;
  syncFullHistory?: boolean;
  wavoipToken?: string;

  constructor(data: any) {
    if (!data) return;

    this.rejectCall = data.rejectCall ?? data.reject_call;
    this.msgCall = data.msgCall ?? data.msg_call;
    this.groupsIgnore = data.groupsIgnore ?? data.groups_ignore;
    this.alwaysOnline = data.alwaysOnline ?? data.always_online;
    this.readMessages = data.readMessages ?? data.read_messages;
    this.readStatus = data.readStatus ?? data.read_status;
    this.syncFullHistory = data.syncFullHistory ?? data.sync_full_history;
    this.wavoipToken = data.wavoipToken ?? data.wavoip_token;
  }
}
