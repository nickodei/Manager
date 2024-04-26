import { Union, Record } from "../fable_modules/fable-library.4.9.0/Types.js";
import { NewRecepie as NewRecepie_2, NewRecepie_$reflection, RecepieOverview_$reflection } from "../Shared/Shared.js";
import { union_type, unit_type, string_type, record_type, option_type, class_type } from "../fable_modules/fable-library.4.9.0/Reflection.js";
import { Cmd_OfAsync_start, Cmd_OfAsyncWith_perform } from "../fable_modules/Fable.Elmish.4.1.0/cmd.fs.js";
import { singleton as singleton_1, map, append, delay, toList, empty } from "../fable_modules/fable-library.4.9.0/Seq.js";
import { ofArray, singleton } from "../fable_modules/fable-library.4.9.0/List.js";
import { Cmd_none } from "../fable_modules/Fable.Elmish.4.1.0/cmd.fs.js";
import { createElement } from "react";
import React from "react";
import { React_useElmish_Z6C327F2E } from "../fable_modules/Feliz.UseElmish.2.5.0/UseElmish.fs.js";
import { ProgramModule_mkProgram } from "../fable_modules/Fable.Elmish.4.1.0/program.fs.js";
import { createObj } from "../fable_modules/fable-library.4.9.0/Util.js";
import { join } from "../fable_modules/fable-library.4.9.0/String.js";
import { View as View_1 } from "../components/recepies/RecepieCard.js";
import { Helpers_combineClasses } from "../fable_modules/Feliz.DaisyUI.4.2.0/DaisyUI.fs.js";
import { Page, Router_navigatePage } from "../Router.js";
import { Interop_reactApi } from "../fable_modules/Feliz.2.7.0/Interop.fs.js";

export class Model extends Record {
    constructor(Recepies, NewRecepie) {
        super();
        this.Recepies = Recepies;
        this.NewRecepie = NewRecepie;
    }
}

export function Model_$reflection() {
    return record_type("Page.Recepies.Model", [], Model, () => [["Recepies", class_type("System.Collections.Generic.IEnumerable`1", [RecepieOverview_$reflection()])], ["NewRecepie", option_type(NewRecepie_$reflection())]]);
}

export class Message extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["LoadRecepies", "RecepiesLoaded", "SetTitle", "CreateRecepie", "RecepieCreated"];
    }
}

export function Message_$reflection() {
    return union_type("Page.Recepies.Message", [], Message, () => [[], [["Item", class_type("System.Collections.Generic.IEnumerable`1", [RecepieOverview_$reflection()])]], [["Item", string_type]], [["Item", option_type(NewRecepie_$reflection())]], [["Item", unit_type]]]);
}

export function createRecepieCommand(api, newRecepie) {
    return Cmd_OfAsyncWith_perform((x) => {
        Cmd_OfAsync_start(x);
    }, api.createRecepie, newRecepie, () => (new Message(4, [void 0])));
}

export function loadRecepies(api) {
    return Cmd_OfAsyncWith_perform((x) => {
        Cmd_OfAsync_start(x);
    }, api.getRecepies, void 0, (Item) => (new Message(1, [Item])));
}

export const init = (() => {
    const model = new Model(empty(), void 0);
    return [model, singleton((dispatch) => {
        dispatch(new Message(0, []));
    })];
})();

export function update(recepieApi, message, prevState) {
    switch (message.tag) {
        case 1: {
            const recepies = message.fields[0];
            const nextState = new Model(recepies, prevState.NewRecepie);
            return [nextState, Cmd_none()];
        }
        case 2: {
            const title = message.fields[0];
            const nextState_1 = new Model(prevState.Recepies, new NewRecepie_2(title));
            return [nextState_1, Cmd_none()];
        }
        case 3: {
            const newRecepie = message.fields[0];
            if (newRecepie == null) {
                return [prevState, Cmd_none()];
            }
            else {
                const value = newRecepie;
                const nextState_2 = new Model(prevState.Recepies, void 0);
                return [nextState_2, createRecepieCommand(recepieApi, value)];
            }
        }
        case 4:
            return [prevState, loadRecepies(recepieApi)];
        default:
            return [prevState, loadRecepies(recepieApi)];
    }
}

export function View(props) {
    let elems;
    const patternInput = React_useElmish_Z6C327F2E(() => ProgramModule_mkProgram(() => init, (message, prevState) => update(props.api, message, prevState), (_arg, _arg_1) => {
    }), void 0, []);
    const model = patternInput[0];
    const dispatch = patternInput[1];
    return createElement("div", createObj(ofArray([["className", join(" ", ["grid", "grid-cols-4", "gap-4"])], (elems = toList(delay(() => append(map((recepie) => createElement(View_1, {
        recepie: recepie,
    }), model.Recepies), delay(() => singleton_1(createElement("button", createObj(Helpers_combineClasses("btn", ofArray([["onClick", (_arg_2) => {
        Router_navigatePage(new Page(1, []));
    }], ["children", "New Recepie"]]))))))))), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

//# sourceMappingURL=Recepies.js.map
