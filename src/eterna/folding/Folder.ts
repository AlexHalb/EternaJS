import PoseOp from 'eterna/pose2D/PoseOp';
import {Oligo} from 'eterna/pose2D/Pose2D';
import DotPlot from 'eterna/rnatypes/DotPlot';
import SecStruct from 'eterna/rnatypes/SecStruct';
import Sequence from 'eterna/rnatypes/Sequence';

export type CacheItem = SecStruct | number[] | FullEvalCache | MultiFoldResult | undefined;
export type CacheKey = Record<string, string | number | number[] | boolean | Oligo[] | null>;

export interface MultiFoldResult {
    pairs: SecStruct;
    order: number[];
    count: number;
}

export interface FullEvalCache {
    nodes: number[];
    energy: number;
}

export default abstract class Folder {
    public abstract get name (): string;
    public abstract get isFunctional (): boolean;

    public getCache(key: CacheKey): CacheItem {
        const keyStr = JSON.stringify(key);
        return this._cache.get(keyStr);
    }

    public get canScoreStructures(): boolean {
        return false;
    }

    public scoreStructures(
        seq: Sequence, secstruct: SecStruct, pseudoknotted: boolean = false,
        temp: number = 37, outNodes: number[] | null = null
    ): number {
        return 0;
    }

    public foldSequence(
        seq: Sequence, secstruct: SecStruct | null, desiredPairs: string | null = null,
        pseudoknotted: boolean = false, temp: number = 37
    ): SecStruct | null {
        return null;
    }

    public get canFoldWithBindingSite(): boolean {
        return false;
    }

    public foldSequenceWithBindingSite(
        seq: Sequence, secstruct: SecStruct | null, bindingSite: number[], bonus: number,
        version: number = 2.0, temp: number = 37
    ): SecStruct | null {
        return null;
    }

    public get canCofold(): boolean {
        return false;
    }

    public cofoldSequence(
        seq: Sequence, secstruct: SecStruct | null, malus: number = 0,
        desiredPairs: string | null = null, temp: number = 37
    ): SecStruct | null {
        return null;
    }

    public get canCofoldWithBindingSite(): boolean {
        return false;
    }

    public cofoldSequenceWithBindingSite(
        seq: Sequence, bindingSite: number[], bonus: number, desiredPairs: string | null = null,
        malus: number = 0, temp: number = 37
    ): SecStruct | null {
        return null;
    }

    public get canDotPlot(): boolean {
        return false;
    }

    public get canPseudoknot(): boolean {
        return false;
    }

    public getDotPlot(
        seq: Sequence, secstruct: SecStruct, temp: number = 37, pseudoknots: boolean = false
    ): DotPlot | null {
        return null;
    }

    public get canMultifold(): boolean {
        return false;
    }

    public multifold(
        seq: Sequence, secstruct: SecStruct | null, oligos: Oligo[],
        desiredPairs: string | null = null, temp: number = 37
    ): MultiFoldResult | undefined {
        return undefined;
    }

    public multifoldUnroll(
        seq: Sequence, secstruct: SecStruct | null, oligos: Oligo[],
        desiredPairs: string | null = null, temp: number = 37
    ): PoseOp[] | null {
        return null;
    }

    // public load_parameters_from_buffer(buf: ByteArray, done_cb: Function = null): boolean {
    //     let res: boolean = false;
    //     if (this._clib_inst != null) {
    //         trace("supplying custom.par");
    //         this._clib_inst.supplyFile("custom.par", buf);
    //         res = this.load_custom_params();
    //     }
    //     return res;
    // }

    protected loadCustomParams(): boolean {
        return false;
    }

    public cutInLoop(i: number): number {
        return 0;
    }

    protected putCache(key: CacheKey, data: CacheItem): void {
        const keyStr = JSON.stringify(key);
        this._cache.set(keyStr, data);
    }

    protected resetCache(): void {
        this._cache.clear();
    }

    private readonly _cache: Map<string, CacheItem> = new Map<string, CacheItem>();
}
