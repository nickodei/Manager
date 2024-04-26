import { PromiseBuilder__Delay_62FBFDE1, PromiseBuilder__Run_212F1D4B } from "./fable_modules/Fable.Promise.2.2.2/Promise.fs.js";
import { promise } from "./fable_modules/Fable.Promise.2.2.2/PromiseImpl.fs.js";
import { fetch$ } from "./fable_modules/Fable.Fetch.2.4.0/Fetch.fs.js";
import { hello } from "./Shared/Shared.js";
import { empty } from "./fable_modules/fable-library.4.9.0/List.js";

(function () {
    const pr = PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
        const header = document.getElementById("header");
        header.innerText = "loading...";
        return (new Promise(resolve => setTimeout(resolve, 1000))).then(() => (fetch$(hello, empty()).then((_arg_1) => {
            const response = _arg_1;
            return response.text().then((_arg_2) => {
                const text = _arg_2;
                header.innerText = text;
                return Promise.resolve();
            });
        })));
    }));
    pr.then();
})();

//# sourceMappingURL=Client.js.map
