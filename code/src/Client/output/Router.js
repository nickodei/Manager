import { Union } from "./fable_modules/fable-library.4.9.0/Types.js";
import { union_type, string_type } from "./fable_modules/fable-library.4.9.0/Reflection.js";
import { equals } from "./fable_modules/fable-library.4.9.0/Util.js";
import { append, singleton, ofArray, empty, tail, head, isEmpty } from "./fable_modules/fable-library.4.9.0/List.js";
import { Route_$007CQuery$007C_$007C } from "./fable_modules/Feliz.Router.4.0.0/Router.fs.js";
import { RouterModule_trySeparateLast, RouterModule_encodeQueryString, RouterModule_nav } from "./fable_modules/Feliz.Router.4.0.0/Router.fs.js";
import { map, defaultArgWith } from "./fable_modules/fable-library.4.9.0/Option.js";
import { Cmd_ofEffect } from "./fable_modules/Fable.Elmish.4.1.0/cmd.fs.js";

export class Page extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Recepies", "RecepiesCreate", "RecepiesEdit", "NotFound"];
    }
}

export function Page_$reflection() {
    return union_type("Manager.Client.Router.Page", [], Page, () => [[], [], [["id", string_type]], []]);
}

export const PageModule_defaultPage = new Page(0, []);

export function PageModule_areRelated(currentPage, next) {
    let matchResult, c, n;
    if (currentPage.tag === 1) {
        if (next.tag === 0) {
            matchResult = 0;
        }
        else {
            matchResult = 1;
            c = currentPage;
            n = next;
        }
    }
    else {
        matchResult = 1;
        c = currentPage;
        n = next;
    }
    switch (matchResult) {
        case 0:
            return true;
        default:
            return equals(c, n);
    }
}

export function PageModule_parseFromUrlSegments(_arg) {
    let matchResult, guid;
    if (!isEmpty(_arg)) {
        if (head(_arg) === "recepies") {
            if (!isEmpty(tail(_arg))) {
                switch (head(tail(_arg))) {
                    case "create": {
                        if (isEmpty(tail(tail(_arg)))) {
                            matchResult = 1;
                        }
                        else {
                            matchResult = 3;
                        }
                        break;
                    }
                    case "edit": {
                        if (!isEmpty(tail(tail(_arg)))) {
                            const activePatternResult = Route_$007CQuery$007C_$007C(head(tail(tail(_arg))));
                            if (activePatternResult != null) {
                                if (!isEmpty(activePatternResult)) {
                                    if (head(activePatternResult)[0] === "guid") {
                                        if (isEmpty(tail(activePatternResult))) {
                                            if (isEmpty(tail(tail(tail(_arg))))) {
                                                matchResult = 2;
                                                guid = head(activePatternResult)[1];
                                            }
                                            else {
                                                matchResult = 3;
                                            }
                                        }
                                        else {
                                            matchResult = 3;
                                        }
                                    }
                                    else {
                                        matchResult = 3;
                                    }
                                }
                                else {
                                    matchResult = 3;
                                }
                            }
                            else {
                                matchResult = 3;
                            }
                        }
                        else {
                            matchResult = 3;
                        }
                        break;
                    }
                    default:
                        matchResult = 3;
                }
            }
            else {
                matchResult = 0;
            }
        }
        else {
            matchResult = 3;
        }
    }
    else {
        matchResult = 3;
    }
    switch (matchResult) {
        case 0:
            return new Page(0, []);
        case 1:
            return new Page(1, []);
        case 2:
            return new Page(2, [guid]);
        default:
            if (isEmpty(_arg)) {
                return PageModule_defaultPage;
            }
            else {
                return new Page(3, []);
            }
    }
}

export function PageModule_noQueryString(segments) {
    return [segments, empty()];
}

export function PageModule_toUrlSegments(_arg) {
    switch (_arg.tag) {
        case 1:
            return PageModule_noQueryString(ofArray(["recepies", "create"]));
        case 0:
            return PageModule_noQueryString(singleton("recepies"));
        case 3:
            return PageModule_noQueryString(singleton("empty"));
        default: {
            const guid = _arg.fields[0];
            return [ofArray(["recepies", "edit"]), singleton(["guid", guid])];
        }
    }
}

export function Router_goToUrl(e) {
    e.preventDefault();
    const href = e.currentTarget.attributes.href.value;
    RouterModule_nav(singleton(href), 1, 2);
}

export function Router_navigatePage(p) {
    const tupledArg = PageModule_toUrlSegments(p);
    const queryString = tupledArg[1];
    defaultArgWith(map((tupledArg_1) => {
        const r = tupledArg_1[0];
        const l = tupledArg_1[1];
        RouterModule_nav(append(r, singleton(l + RouterModule_encodeQueryString(queryString))), 1, 2);
    }, RouterModule_trySeparateLast(tupledArg[0])), () => {
        RouterModule_nav(singleton(RouterModule_encodeQueryString(queryString)), 1, 2);
    });
}

export function Cmd_navigatePage(p) {
    const tupledArg = PageModule_toUrlSegments(p);
    return Cmd_ofEffect((_arg_1) => {
        const queryString_1 = tupledArg[1];
        defaultArgWith(map((tupledArg_1) => {
            const r = tupledArg_1[0];
            const l = tupledArg_1[1];
            RouterModule_nav(append(r, singleton(l + RouterModule_encodeQueryString(queryString_1))), 1, 2);
        }, RouterModule_trySeparateLast(tupledArg[0])), () => {
            RouterModule_nav(singleton(RouterModule_encodeQueryString(queryString_1)), 1, 2);
        });
    });
}

//# sourceMappingURL=Router.js.map
