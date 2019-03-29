---
order: 2
zh-CN:
	title: 为不同关键字设置不同的样式
	content: "奴才总不过是寻人诉苦。只要这样，也只能这样。有一日，他遇到一个聪明人。“先生！”他悲哀地说，眼泪联成一线，就从眼角上直流下来。“你知道的。我所过的简直不是人的生活。吃的是一天未必有一餐，这一餐又不过是高粱皮，连猪狗都不要吃的，尚且只有一小碗……。”“这实在令人同情。”聪明人也惨然说。“可不是么！”他高兴了。“可是做工是昼夜无休息的：清早担水晚烧饭，上午跑街夜磨面，晴洗衣裳雨张伞，冬烧汽炉夏打扇。半夜要煨银耳，侍候主人耍钱；头钱从来没分，有时还挨皮鞭……。”“唉唉……。”聪明的人叹息着，眼圈有些发红，似乎要下泪。“先生！我这样是敷衍不下去的。我总得另外想法子。可是什么法子呢？……”“我想，你总会好起来……。”“是么？但愿如此。可是我对先生诉了冤苦，又得你的同情和慰安，已经舒坦得不少了。可见天理没有灭绝……。”但是，不几日，他又不平起来了，仍然寻人去诉苦。“先生！”他流着眼泪说，“你知道的。我住的简直比猪窠还不如。主人并不将我当人；他对他的叭儿狗还要好到几万倍……。”“混帐！”那人大叫起来，使他吃惊了。那人是一个傻子。“先生，我住的只是一间破小屋，又湿，又阴，满是臭虫，睡下去就咬得真可以。秽气冲着鼻子，四面又没有一个窗……。”“你不会要你的主人开一个窗的么？”“这怎么行？……”“那么，你带我去看去！”傻子跟奴才到他屋外，动手就砸那泥墙。“先生！你干什么？”他大惊地说。“我给你打开一个窗洞来。”“这不行！主人要骂的！”“管他呢！”他仍然砸。“人来呀！强盗在毁咱们的屋子了！快来呀！迟一点可要打出窟窿来了！……”他哭嚷着，在地上团团地打滚。一群奴才都出来了，将傻子赶走。听到了喊声，慢慢地最后出来的是主人。“有强盗要来毁咱们的屋子，我首先叫喊起来，大家一同把他赶走了。”他恭敬而得胜地说。“你不错。”主人这样夸奖他。这一天就来了许多慰问的人，聪明人也在内。“先生。这回因为我有功，主人夸奖了我了。你先前说我总会好起来，实在是有先见之明……。”他大有希望似的高兴地说。“可不是么……。"
	word1: 先生
	word2: 聪明人
en-US:
	title: Different styles for different search words
	content: "Chain Chomps (occasionally Chain-Chomps) are common enemies in the Mario franchise. They first appeared in Super Mario Bros. 3. Chain Chomps bear a resemblance to a ball and chain and are typified by their large, tooth-filled maws and incessant biting. Shigeru Miyamoto's inspiration for the Chain Chomps was from a childhood experience: a dog once ran up to him and tried to bite him, but the dog's chain held it back. As a result, Chain Chomps also possess canine qualities, such as barking, and are commonly used as guard dogs throughout the Mario series. Chain Chomps were originally created as an enemy for The Legend of Zelda series, but ended up being used for the Mario franchise first. Many Chomps have been part of the Koopa Troop, though a couple of them have been shown to be independent. "
	word1: Chomps
	word2: Chain
---

```jsx
import { TextMark } from 'zent';

ReactDOM.render(
	<TextMark
		style={{ lineHeight: '28px' }}
		activeIndex={1}
		activeClassName="zent-demo-text-mark-active"
		highlightClassName={{
			'{i18n.word1}': 'zent-demo-text-mark-highlight',
			'{i18n.word2}': 'zent-demo-text-mark-highlight2',
		}}
		searchWords={['{i18n.word1}', '{i18n.word2}']}
		textToHighlight="{i18n.content}"
	/>,
	mountNode
);
```

<style>
.zent-demo-text-mark-highlight2 {
	background-color: #df4545;
}
</style>
