import Eterna from 'eterna/Eterna';
import Utility from 'eterna/util/Utility';

interface EternaURLParams {
    page: string;
    puznid?: number;
    uid?: number;
    nid?: number;
    filter1?: string;
    filter1_arg1?: number | string;
    filter1_arg2?: number;
}

export default class EternaURL {
    public static readonly BARCODE_HELP: string = '/web/lab/manual/#barcode';
    public static readonly STRATEGY_GUIDE: string =
    'http://getsatisfaction.com/eternagame/topics/the_strategy_guide_to_solve_eterna_puzzles';

    public static getFeedURL(): string {
        return Eterna.playerID === 0
            ? EternaURL.createURL({page: 'register'})
            : EternaURL.createURL({page: 'me'});
    }

    /**
     * Route a set of parameters to the correct URL subdirectory
     *
     * @param params an object containing a 'page' value and possibly a 'puznid' for browsing
     *
     * @returns a URL string
     */
    public static createURL(params: EternaURLParams | null): string {
        if (params == null) {
            params = {page: 'me'};
        }

        if (params['page'] === 'player') {
            return `/web/player/${params['uid']}/`;
        } else if (params['page'] === 'lab_bench') {
            return '/web/';
        } else if (params['page'] === 'me') {
            return '/web/';
        } else if (params['page'] === 'roadmap') {
            return '/web/roadmap/';
        } else if (params['page'] === 'about') {
            return '/web/about/';
        } else if (params['page'] === 'tutorials') {
            return '/web/tutorials/';
        } else if (params['page'] === 'challenges') {
            return '/web/challenges/';
        } else if (params['page'] === 'playerpuzzles') {
            return '/web/playerpuzzles/';
        } else if (params['page'] === 'currentlabs') {
            return '/web/labs/';
        } else if (params['page'] === 'proposedlabs') {
            return '/web/labs/proposed/';
        } else if (params['page'] === 'waitinglabs') {
            return '/web/labs/waiting/';
        } else if (params['page'] === 'pastlabs') {
            return '/web/labs/past/';
        } else if (params['page'] === 'strategymarket') {
            return '/web/strategymarket/';
        } else if (params['page'] === 'scripts') {
            return '/web/script/';
        } else if (params['page'] === 'manual') {
            return '/web/lab/manual/';
        } else if (params['page'] === 'newslist') {
            return '/web/news/';
        } else if (params['page'] === 'players') {
            return '/web/players/';
        } else if (params['page'] === 'register') {
            return '/web/register/';
        } else if (params['page'] === 'puzzle') {
            return `/web/puzzle/${params['nid']}/`;
        } else if (params['page'] === 'strategy_guides') {
            return '/web/strategy_guides/';
        } else if (params['page'] === 'blog') {
            return '/web/blog/';
        } else if (params['page'] === 'lab_browser') {
            return `/web/browse/${params['nid']}/`;
        } else if (params['page'] === 'browse_solution' || params['page'] === 'browse_player') {
            const url = `/game/browse/${params['puznid']}/?`;
            delete params['page'];
            delete params['puznid'];
            return url + new URLSearchParams({
                filter1: params.filter1 as string,
                /* eslint-disable @typescript-eslint/camelcase */
                filter1_arg1: String(params.filter1_arg1) as string,
                filter1_arg2: String(params.filter1_arg2) as string
                /* eslint-enable @typescript-eslint/camelcase */
            });
        } else if (params['page'] === 'script') {
            return '/web/script/';
        } else if (params['page'] === 'group') {
            return '/web/group/';
        } else if (params['page'] === 'conduct') {
            return '/web/conduct/';
        }

        return '/web/';
    }
}
