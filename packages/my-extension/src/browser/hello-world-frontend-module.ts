/*
 * Copyright (C) 2017 QNX Software Systems and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { HelloWorldCommandContribution, HelloWorldMenuContribution, MyExtensionFrontEndContribution } from './hello-world-contribution';
import { FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';
import {
    CommandContribution,
    MenuContribution,
} from "@theia/core/lib/common";
import { MyExtensionWidget } from './my-extension-widget';
import { ContainerModule } from "inversify";

export default new ContainerModule(bind => {
    // add your contribution bindings here

    bind(CommandContribution).to(HelloWorldCommandContribution);
    bind(MenuContribution).to(HelloWorldMenuContribution);
    bind(FrontendApplicationContribution).to(MyExtensionFrontEndContribution).inSingletonScope();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: 'my-extension',
        createWidget() {
            return ctx.container.get(MyExtensionWidget);
        }
    })).inSingletonScope();


});