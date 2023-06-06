import { ReactComponent as Avengers } from "./avengers.svg";
import { ReactComponent as BlackPanther } from "./black_panther.svg";
import { ReactComponent as BlackPantherCute } from "./black_panther_cute.svg";
import { ReactComponent as BlackWidow } from "./black_widow.svg";
import { ReactComponent as CaptainAmerica } from "./captain_america.svg";
import { ReactComponent as Cyclops } from "./cyclops.svg";
import { ReactComponent as Daredevil } from "./daredevil.svg";
import { ReactComponent as Groot } from "./groot.svg";
import { ReactComponent as Hulk } from "./hulk.svg";
import { ReactComponent as IronMan } from "./iron_man.svg";
import { ReactComponent as Loki } from "./loki.svg";
import { ReactComponent as Rocket } from "./rocket.svg";
import { ReactComponent as ScarletWitch } from "./scarlet_witch.svg";
import { ReactComponent as SpiderGwen } from "./spider_gwen.svg";
import { ReactComponent as Thor } from "./thor.svg";
import { ReactComponent as Wolverine } from "./wolverine.svg";
import { ReactComponent as WolverineCute } from "./wolverine_cute.svg";

import { ReactComponent as Edit } from "./edit-svgrepo-com.svg";
import { ReactComponent as Double } from "./powers/double.svg";
import { ReactComponent as TimeStop } from "./powers/timestop2.svg";
import { ReactComponent as Hint } from "./powers/hint.svg";
import { Powers } from "src/types/Powers";

export const Icons = {
    Avengers,
    BlackPanther,
    BlackPantherCute,
    BlackWidow,
    CaptainAmerica,
    Cyclops,
    Daredevil,
    Groot,
    Hulk,
    IronMan,
    Loki,
    Rocket,
    ScarletWitch,
    SpiderGwen,
    Thor,
    Wolverine,
    WolverineCute,
};

export type IconNames = keyof typeof Icons;

export type IconType = React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }
>;

export const Symbols = {
    Edit,
    [Powers.DOUBLE]: Double,
    [Powers.TIME_STOP]: TimeStop,
    [Powers.HINT]: Hint,
};

export type SymbolNames = keyof typeof Symbol;
