/*
 * Copyright (C) 2017 QNX Software Systems and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
import { injectable } from 'inversify';
import { VirtualWidget } from '@theia/core/lib/browser';
import { h } from '@phosphor/virtualdom';

@injectable()
export class MyExtensionWidget extends VirtualWidget {

    constructor() {
        super();
        this.id = 'my-extension';
        this.title.label = 'My Extension';
    }

    protected render(): h.Child {
        const spinner = h.div({ className: 'fa fa-spinner fa-pulse fa-3x fa-fw' }, '');
        return h.div({ className: 'spinnerContainer' }, spinner);
    }
}