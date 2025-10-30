import { RouterBroker } from '@api/abstract/abstract.router';
import { InstanceDto } from '@api/dto/instance.dto';
import { SettingsDto } from '@api/dto/settings.dto';
import { settingsController } from '@api/server.module';
import { settingsSchema } from '@validate/validate.schema';
import { RequestHandler, Router } from 'express';

import { HttpStatus } from './index.router';

export class SettingsRouter extends RouterBroker {
  constructor(...guards: RequestHandler[]) {
    super();
    this.router
      .post(this.routerPath('set'), ...guards, async (req, res) => {
        req.body = {
          rejectCall: req.body?.reject_call,
          msgCall: req.body?.msg_call,
          groupsIgnore: req.body?.groups_ignore,
          alwaysOnline: req.body?.always_online,
          readMessages: req.body?.read_messages,
          readStatus: req.body?.read_status,
          syncFullHistory: false,
        };

        const response = await this.dataValidate<SettingsDto>({
          request: req,
          schema: settingsSchema,
          ClassRef: SettingsDto,
          execute: (instance, data) => settingsController.createSettings(instance, data),
        });

        res.status(HttpStatus.CREATED).json(response);
      })
      .get(this.routerPath('find'), ...guards, async (req, res) => {
        const response = await this.dataValidate<InstanceDto>({
          request: req,
          schema: null,
          ClassRef: InstanceDto,
          execute: (instance) => settingsController.findSettings(instance),
        });

        res.status(HttpStatus.OK).json(response);
      });
  }

  public readonly router: Router = Router();
}
