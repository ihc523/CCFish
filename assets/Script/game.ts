import { FishState, FishType } from './FishType';
import Fish from './Fish';
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    fishPool: cc.NodePool;
    fishTypes: any;

    @property(cc.Prefab)
    fishPrefab: cc.Prefab = null;

    onLoad() {
        // let fish = cc.instantiate(this.fishPrefab);
        // fish.setPosition(cc.p(100, 100));
        // this.node.addChild(fish);
        this.fishPool = new cc.NodePool(Fish);
        let self = this;

        // 动态加载json配置文件
        cc.loader.loadRes("fishconfig", function (err, data) {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            // 加载之后转类型
            self.fishTypes = <FishType[]>data;
        //    self.initFish();
        });

        this.schedule(this.creatFish, 1);

    }

    initFish() {
        var self = this;
        // if (this.fishTypes.length > 0) {
        //     this.fishTypes.forEach(value => {
        //         let fish = cc.instantiate(self.fishPrefab);
        //         let runstring = value.name + '_run';
        //         let fish_x = cc.randomMinus1To1() * self.node.width / 2;
        //         let fish_y = cc.randomMinus1To1() * self.node.height / 2;
        //         fish.setPosition(fish_x, fish_y);
        //         self.node.addChild(fish);
        //         fish.getComponent(Fish).initFish(value.name + '_run');

        //     });
        // }
        let fish = cc.instantiate(self.fishPrefab);
        fish.getComponent(Fish).initFish();


    }

    creatFish() {
        var self = this;
        let fish = cc.instantiate(self.fishPrefab);
        fish.getComponent(Fish).initFish();
    }

    start() {

    }

    // update (dt) {},
}