// import { ReactComponent as Avengers } from "./avengers.svg";
import { ReactComponent as BlackPanther } from "./black_panther.svg";
import { ReactComponent as BlackPantherCute } from "./black_panther_cute.svg";
import { ReactComponent as BlackWidow } from "./black_widow.svg";
import { ReactComponent as CaptainAmerica } from "./captain_america.svg";
import { ReactComponent as Cyclops } from "./cyclops.svg";
import { ReactComponent as Groot } from "./groot.svg";
import { ReactComponent as Hulk } from "./hulk.svg";
import { ReactComponent as IronMan } from "./iron_man.svg";
import { ReactComponent as Rocket } from "./rocket.svg";
import { ReactComponent as ScarletWitch } from "./scarlet_witch.svg";
import { ReactComponent as Shield } from "./shield.svg";
const SpiderGwen = require("./spider_gwen.svg").ReactComponent;

const Avengers = require("./avengers.svg").ReactComponent;

// let BlackPanther = "./black_panther.svg";
// let BlackWidow = "./black_widow.svg";
// let CaptainAmerica = "./captain_america.svg";
// let Cyclops = "./cyclops.svg";
// let Groot = "./groot.svg";
// let Hulk = "./hulk.svg";
// let IronMan = "./iron_man.svg";
// let Rocket = "./rocket.svg";
// let ScarletWitch = "./scarlet_witch.svg";
// let SpiderGwen = "./spider_gwen.svg";
export const Icons = {
    Avengers,
    BlackPanther,
    BlackPantherCute,
    BlackWidow,
    CaptainAmerica,
    Cyclops,
    Groot,
    Hulk,
    IronMan,
    Rocket,
    ScarletWitch,
    Shield,
    SpiderGwen,
};

export type IconNames = keyof typeof Icons;

export type IconType = React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }
>;
