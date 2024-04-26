import { Union, Record } from "./fable_modules/fable-library.4.9.0/Types.js";
import { Cmd_navigatePage, PageModule_parseFromUrlSegments, Page_$reflection } from "./Router.js";
import { union_type, record_type } from "./fable_modules/fable-library.4.9.0/Reflection.js";
import { Remoting_buildProxy_64DC51C } from "./fable_modules/Fable.Remoting.Client.7.32.0/Remoting.fs.js";
import { RemotingModule_createApi, RemotingModule_withRouteBuilder } from "./fable_modules/Fable.Remoting.Client.7.32.0/Remoting.fs.js";
import { IRecepieApi_$reflection, Route_builder } from "./Shared/Shared.js";
import { RouterModule_router, RouterModule_urlSegments } from "./fable_modules/Feliz.Router.4.0.0/Router.fs.js";
import { Cmd_none } from "./fable_modules/Fable.Elmish.4.1.0/cmd.fs.js";
import { createElement } from "react";
import * as react from "react";
import { createObj } from "./fable_modules/fable-library.4.9.0/Util.js";
import { singleton, delay, toList } from "./fable_modules/fable-library.4.9.0/Seq.js";
import { View } from "./pages/Recepies.js";
import { ofArray } from "./fable_modules/fable-library.4.9.0/List.js";
import { Interop_reactApi } from "./fable_modules/Feliz.2.7.0/Interop.fs.js";

export class Model extends Record {
    constructor(CurrentPage) {
        super();
        this.CurrentPage = CurrentPage;
    }
}

export function Model_$reflection() {
    return record_type("Index.Model", [], Model, () => [["CurrentPage", Page_$reflection()]]);
}

export class Message extends Union {
    constructor(Item) {
        super();
        this.tag = 0;
        this.fields = [Item];
    }
    cases() {
        return ["UrlChanged"];
    }
}

export function Message_$reflection() {
    return union_type("Index.Message", [], Message, () => [[["Item", Page_$reflection()]]]);
}

export const recepieApi = Remoting_buildProxy_64DC51C(RemotingModule_withRouteBuilder(Route_builder, RemotingModule_createApi()), IRecepieApi_$reflection());

export function init() {
    let fullPath;
    const nextPage = PageModule_parseFromUrlSegments((fullPath = (window.location.pathname + window.location.search), RouterModule_urlSegments(fullPath, 2)));
    return [new Model(nextPage), Cmd_navigatePage(nextPage)];
}

export function update(msg, state) {
    const page = msg.fields[0];
    return [new Model(page), Cmd_none()];
}

export function view(state, dispatch) {
    let elems, elements;
    return createElement("section", createObj(ofArray([["className", "h-screen w-screen"], (elems = [RouterModule_router(createObj(ofArray([["hashMode", 2], ["onUrlChanged", (arg_1) => {
        dispatch(new Message(PageModule_parseFromUrlSegments(arg_1)));
    }], (elements = toList(delay(() => {
        const matchValue = state.CurrentPage;
        switch (matchValue.tag) {
            case 1:
                return singleton(createElement("h1", {
                    children: ["Recepie created"],
                }));
            case 2: {
                const guid = matchValue.fields[0];
                return singleton(createElement("h1", {
                    children: ["Recepie edit: " + guid],
                }));
            }
            case 3:
                return singleton(createElement("h1", {
                    children: ["Page not found!"],
                }));
            default:
                return singleton(createElement(View, {
                    api: recepieApi,
                }));
        }
    })), ["application", react.createElement(react.Fragment, {}, ...elements)])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

//# sourceMappingURL=Index.js.map
