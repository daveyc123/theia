/*
 * Copyright (C) 2017 QNX Software Systems and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */


import { injectable, inject } from "inversify";
import { FrontendApplication, FrontendApplicationContribution } from "@theia/core/lib/browser";
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MAIN_MENU_BAR, MessageService } from "@theia/core/lib/common";
import { WidgetManager } from '@theia/core/lib/browser/widget-manager';
import { CommonMenus } from "@theia/core/lib/browser";

export const HelloWorldCommand = {
    id: 'HelloWorld.command',
    label: "Shows a message"
};

@injectable()
export class HelloWorldCommandContribution implements CommandContribution {

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(HelloWorldCommand);
        registry.registerHandler(HelloWorldCommand.id, {
            execute: (): any => {
                this.messageService.info('Hello Worldaaaa!');
                return null;
            },
            isEnabled: () => true
        });
    }
}

@injectable()
export class HelloWorldMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction([
            MAIN_MENU_BAR,
            CommonMenus.EDIT_MENU,
            CommonMenus.EDIT_MENU_FIND_REPLACE_GROUP
        ], {
                commandId: HelloWorldCommand.id,
                label: 'Say Hello'
            });
    }
}

@injectable()
export class MyExtensionFrontEndContribution implements FrontendApplicationContribution {

    constructor(
        @inject(WidgetManager) protected readonly widgetManager: WidgetManager,
        @inject(MessageService) protected readonly messageService: MessageService,
    ) { }

    async onStart(app: FrontendApplication): Promise<void> {
        const myExtensionWidget = await this.widgetManager.getOrCreateWidget('my-extension');
        app.shell.addToLeftArea(myExtensionWidget, {
            rank: 300
        });
    }

}