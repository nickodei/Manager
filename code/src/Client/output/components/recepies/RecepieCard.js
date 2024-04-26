import { createElement } from "react";
import React from "react";
import { createObj } from "../../fable_modules/fable-library.4.9.0/Util.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.DaisyUI.4.2.0/DaisyUI.fs.js";
import { Page, Router_navigatePage } from "../../Router.js";
import { singleton, ofArray } from "../../fable_modules/fable-library.4.9.0/List.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/Interop.fs.js";

export function View(props) {
    let elems_2, children_4, children_2;
    return createElement("div", createObj(Helpers_combineClasses("card", ofArray([["className", "bordered"], (elems_2 = [(children_4 = ofArray([createElement("h2", {
        className: "card-title",
        children: props.recepie.Title,
    }), createElement("p", {
        children: ["test: " + props.recepie.Id],
    }), (children_2 = singleton(createElement("button", createObj(Helpers_combineClasses("btn", ofArray([["children", "Go to recepie"], ["className", "btn-primary"], ["onClick", (_arg) => {
        Router_navigatePage(new Page(2, [props.recepie.Id]));
    }]]))))), createElement("div", {
        className: "card-actions",
        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
    }))]), createElement("div", {
        className: "card-body",
        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])]))));
}

//# sourceMappingURL=RecepieCard.js.map
