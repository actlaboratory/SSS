import React from 'react';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import ImputRow from './ImputRow'
import InputRadioRow from './ImputRadioRow'

type param = {
  kyuuyo_shuunyuu:number,
  kyuuyo_shuunyuu_shaho_fusannyuu:number,
  shahonomi_shuunyuu:number,
  shahogai_kyuuyo:number,
  sonota_shotoku:number,

  haiguusha_type:number,
  jakunen_fuyou_shinzoku:number,
  seinen_fuyou_shinzoku:number,
  fuyou_shinzoku:number,
  tokutei_fuyou_shinzoku:number,
  roujin_fuyou_shinzoku:number,
  doukyo_roujin:number,
  doukyo_tokubetsu_shougai:number,
  tokubetsu_shougai:number,
  shougai:number,

  koujo:number,
  dokushin_type:number,
  gakusei_type:number,
}

const App: React.FC = () => {
  const [params, setParams] = useState<param>({
    kyuuyo_shuunyuu : 0,
    kyuuyo_shuunyuu_shaho_fusannyuu : 0,
    shahonomi_shuunyuu : 0,
    shahogai_kyuuyo : 0,
	sonota_shotoku : 0,

    haiguusha_type : 0,
    jakunen_fuyou_shinzoku : 0,
    seinen_fuyou_shinzoku : 0,
    fuyou_shinzoku : 0,
    tokutei_fuyou_shinzoku : 0,
    roujin_fuyou_shinzoku : 0,
    doukyo_roujin : 0,

    doukyo_tokubetsu_shougai: 0,
    tokubetsu_shougai: 0,
    shougai: 0,

    koujo: 0,
    dokushin_type: 0,
    gakusei_type: 0,
  });

  function calcKyuuyoshotokuKoujo(v: number): number {
    if (v <= 550000) {
        return v
    }

    let result = 0

    result += Math.min(8500000,v) * 0.1
    result += Math.min(6600000,v) * 0.1
    result += Math.min(3600000,v) * 0.1
    result += Math.min(1800000,v) * 0.1

    return Math.round(Math.max(550000, result - 100000))
  }

  function calcShaho(v: number): number {
     return Math.round(v * (0.0915 + 0.0500 + 0.006))
  }

  const kyuuyo_shotoku_koujo = calcKyuuyoshotokuKoujo(params["kyuuyo_shuunyuu"] + params["shahogai_kyuuyo"])
  const kyuuyo_shotoku = params["kyuuyo_shuunyuu"] + params["shahogai_kyuuyo"] - kyuuyo_shotoku_koujo
  const shotoku = kyuuyo_shotoku + params["sonota_shotoku"]
  const shaho = calcShaho(params["kyuuyo_shuunyuu"] - params["kyuuyo_shuunyuu_shaho_fusannyuu"] + params["shahonomi_shuunyuu"])
  let haiguusha_tokubetsu_koujo = 0;
  switch(params["haiguusha_type"]) {
      case 4:
          haiguusha_tokubetsu_koujo = 330000;
          break;
      case 5:
          haiguusha_tokubetsu_koujo = 310000;
          break;
      case 6:
          haiguusha_tokubetsu_koujo = 260000;
          break;
      case 7:
          haiguusha_tokubetsu_koujo = 220000;
          break;
      case 8:
          haiguusha_tokubetsu_koujo = 210000;
          break;
      case 9:
          haiguusha_tokubetsu_koujo = 180000;
          break;
      case 10:
          haiguusha_tokubetsu_koujo = 160000;
          break;
      case 11:
          haiguusha_tokubetsu_koujo = 140000;
          break;
      case 12:
          haiguusha_tokubetsu_koujo = 110000;
          break;
      case 13:
          haiguusha_tokubetsu_koujo = 90000;
          break;
      case 14:
          haiguusha_tokubetsu_koujo = 80000;
          break;
      case 15:
          haiguusha_tokubetsu_koujo = 70000;
          break;
      case 16:
          haiguusha_tokubetsu_koujo = 60000;
          break;
      case 17:
          haiguusha_tokubetsu_koujo = 40000;
          break;
      case 18:
          haiguusha_tokubetsu_koujo = 30000;
          break;
      case 19:
          haiguusha_tokubetsu_koujo = 20000;
          break;
      case 20:
          haiguusha_tokubetsu_koujo = 10000;
          break;
  }

  const shougaisha_koujo = (params["doukyo_tokubetsu_shougai"] + params["tokubetsu_shougai"])*400000 +params["shougai"] * 270000;

  // ひとり親・寡婦・勤労学生
  let kojin_koujo = 0;
  switch (params["dokushin_type"]) {
      case 1:
          kojin_koujo+=350000;
          break;
      case 2:
          kojin_koujo+=270000;
          break;
  }
  if (params["gakusei_type"] == 1) {
      kojin_koujo+=270000;
  }
    const koujo = shaho+haiguusha_tokubetsu_koujo+shougaisha_koujo+kojin_koujo+params["koujo"];

  const kasan =(params["jakunen_fuyou_shinzoku"]+params["seinen_fuyou_shinzoku"]+params["tokutei_fuyou_shinzoku"])*650000+
      (params["roujin_fuyou_shinzoku"]+params["doukyo_roujin"])*480000+
      params["fuyou_shinzoku"]*380000+
      (params["haiguusha_type"] == 2 ? 380000 : 0)+
      (params["haiguusha_type"] == 3 ? 650000 : 0);

  return (
    <>
      <div className="jumbotron">
        <h2 className="text-center">
          所得制限シミュレータ
        </h2>
        <div className="container px-5 pt-5">
          <p>
            給与所得を中心とするサラリーマンを対象に、各種手当や制度の利用条件となる所得制限の金額と、入力した条件での所得金額を比較できるシミュレータです。
          </p>
          <p>
            現在は、20歳前の傷病による障害基礎年金のみに対応しています。
            今後、対応する制度を追加予定です。
          </p>
        </div>
      </div>

      <div className="d-flex align-items-center text-white bg-primary px-3">
        <h3 className="h2 my-0">試算条件</h3>
      </div>

      <ImputRow
        id="kyuuyo_shuunyuu"
        name="①　課税給与収入"
        type="number"
        min={0}
        description = "本給・時間外手当・金銭で支給する住宅手当等、ほとんどの賃金(社会保険料の算定対象)"
        onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
          setParams({...params, "kyuuyo_shuunyuu" : Number(e.target.value)})
        }}
      / >

      <ImputRow
        id="kyuuyo_shuunyuu_shaho_fusannyuu"
        name="②　①のうち社保不算入の収入"
        type="number"
        min={0}
        description = "一部の福利厚生等で、この取扱いとなっているもの"
        onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
          setParams({...params, "kyuuyo_shuunyuu_shaho_fusannyuu" : Number(e.target.value)})
        }}
      / >

      <ImputRow
        id="shahonomi_shuunyuu"
        name="③　社保のみ算入の非課税報酬額"
        type="number"
        min={0}
        description = "非課税交通費、社宅や食事等の現物支給を所定の計算で金銭に換算した金額等"
        onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
          setParams({...params, "shahonomi_shuunyuu" : Number(e.target.value)})
        }}
      / >

      <ImputRow
        id="shahogai_kyuuyo"
        name="④　社保適用外の勤務先から受ける課税給与収入"
        type="number"
        min={0}
        description = "勤務時間が短い、従業員５人以下の個人事業主による雇用等のため、給与から社会保険料が控除されていない勤務先から受ける給与収入"
        onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
          setParams({...params, "shahogai_kyuuyo" : Number(e.target.value)})
        }}
      / >

      <ImputRow
        id="sonota_shotoku"
        name="⑤　その他の課税所得金額"
        type="number"
        min={0}
        description = "給与以外(事業・不動産・山林・利子・配当・退職・譲渡・一時・雑)の所得の合計額(税法上許される範囲で損益通算してよいが、前年以前の損失の繰越控除や外国で得た所得に関するものなど一部の規則は適用しない)"
        onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
          setParams({...params, "sonota_shotoku" : Number(e.target.value)})
        }}
      / >

      <InputRadioRow
         title = "⑥配偶者の状況"
         name = "haiguusha_type"
         values = {{"なし": "0", "控除対象外":"-1","一般の控除対象":"-2", "老人控除対象":"-3","特別控除33万円":"33","特別控除31万円":"31","特別控除26万円":"26","特別控除22万円":"22","特別控除21万円":"21","特別控除18万円":"18","特別控除16万円":"16","特別控除14万円":"14","特別控除11万円":"11","特別控除9万円":"9","特別控除8万円":"8","特別控除7万円":"7","特別控除6万円":"6","特別控除4万円":"4","特別控除3万円":"3","特別控除2万円":"2","特別控除1万円":"1"}}
         selected = {""+params["haiguusha_type"]}
         description = "生計を一にする等の要件を満たして控除対象とする配偶者の有無と区分を、合計所得金額48万円以下の場合は70歳以上か未満かに応じた一般・老人の別、合計所得金額が48万円超133万円以下の場合は自身と配偶者の収入に応じた配偶者特別控除額の中から選択"
         onChange ={(e : React.ChangeEvent<HTMLInputElement>) => {
           setParams({...params, "haiguusha_type" : Number(e.target.value)})
        }}
      / >

      <ImputRow
        id="jakunen_fuyou_shinzoku"
        name="⑦　16歳未満の扶養親族の人数"
        type="number"
        min={0}
        description = "合計所得金額48万円以下、同一生計等の要件を満たし、扶養親族としている人のうち、年末時点で16歳未満の人の人数"
        onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
          setParams({...params, "jakunen_fuyou_shinzoku" : Number(e.target.value)})
        }}
      / >

          <ImputRow
              id="seinen_fuyou_shinzoku"
              name="⑧　16～18歳の扶養親族の人数"
              type="number"
              min={0}
              description = "合計所得金額48万円以下、同一生計等の要件を満たし、扶養親族としている人の内、年末時点で16～18歳の人の人数"
              onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                  setParams({...params, "seinen_fuyou_shinzoku" : Number(e.target.value)})
              }}
              / >

      <ImputRow
        id="tokutei_fuyou_shinzoku"
        name="⑨　特定扶養親族の人数"
        type="number"
        min={0}
        description = "合計所得金額48万円以下、同一生計等の要件を満たし、扶養親族としている人の内、年末時点で19～22歳の人の人数"
        onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
          setParams({...params, "tokutei_fuyou_shinzoku" : Number(e.target.value)})
        }}
      / >

      <ImputRow
        id="roujin_fuyou_shinzoku"
        name="⑩　老人扶養親族(同居老親等以外)の人数"
        type="number"
        min={0}
        description = "合計所得金額48万円以下、同一生計等の要件を満たし、扶養親族としている人の内、年末時点で70歳以上かつ同居老親等の要件を満たさない人の人数"
        onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
          setParams({...params, "roujin_fuyou_shinzoku" : Number(e.target.value)})
        }}
      / >

      <ImputRow
        id="doukyo_roujin"
        name="⑪　老人扶養親族(同居老親等)の人数"
        type="number"
        min={0}
        description = "合計所得金額48万円以下、同一生計等の要件を満たし、扶養親族としている人の内、年末時点で70歳以上かつ同居老親等の要件を満たす人の人数"
        onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
          setParams({...params, "doukyo_roujin" : Number(e.target.value)})
        }}
      / >

      <ImputRow
        id="fuyou_shinzoku"
        name="⑫　一般の扶養親族の人数"
        type="number"
        min={0}
        description = "合計所得金額48万円以下、同一生計等の要件を満たし、扶養親族としている人の人数のうち、⑦・⑧・⑨・⑩・⑪を除く人数"
        onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
          setParams({...params, "fuyou_shinzoku" : Number(e.target.value)})
        }}
      / >

      <ImputRow
        id="doukyo_tokubetsu_shougai"
        name="⑬　同居特別障害者控除の対象者数"
        type="number"
        description = "合計所得金額48万円以下の配偶者または扶養親族の内、本人・配偶者・生計を一にする親族のいずれかとの同居を常としている特別障害者の人数(20歳前傷病にかかる障害基礎年金の受給者を除く)"
        onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
          setParams({...params, doukyo_tokubetsu_shougai: Number(e.target.value)})
        }}
      / >

      <ImputRow
        id="tokubetsu_shougai"
        name="⑭　特別障害者控除の対象者数"
        type="number"
        description = "合計所得金額48万円以下の配偶者または扶養親族と本人の内、介護保険の要介護３以上の方の一部、身体障害2級鵜以上、知的障害重度、精神障害1級等の人の人数(⑬と、20歳前傷病にかかる障害基礎年金の受給者を除く)"
        onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
          setParams({...params, tokubetsu_shougai: Number(e.target.value)})
        }}
      / >

      <ImputRow
        id="shougai"
        name="⑮　障害者控除の対象者数"
        type="number"
        description = "合計所得金額48万円以下の配偶者または扶養親族と本人の内、介護保険の要支援２以上の方の一部、身体・知的・精神障害者等の人数(⑬・⑭と20歳前傷病にかかる障害基礎年金の受給者を除く)"
        onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
          setParams({...params, shougai: Number(e.target.value)})
        }}
      / >

      <ImputRow
        id="koujo"
        name="⑯　雑損・医療費・小規模企業共済等掛金・給与天引き以外で支払った社会保険料の控除額"
        type="number"
        description = "被災や盗難・横領被害などによる雑損控除、医療費控除、小規模企業共済・確定拠出年金・心身障害者扶養共済の掛金を支払った場合の小規模企業共済等掛金控除、給与天引き以外で支払った社会保険料の控除額の合計"
        onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
          setParams({...params, koujo: Number(e.target.value)})
        }}
      / >

      <InputRadioRow
         title = "⑰　ひとり親と寡婦の控除"
         name = "dokushin_type"
         values = {{"該当なし": "0", "ひとり親控除対象":"1","寡婦控除対象":"2"}}
         selected = {""+params["dokushin_type"]}
         description = "ひとり親控除は、他の人の同一生計配偶者や扶養親族になっていない総所得金額等が48万円以下の子と生計を一にし、婚姻をしていないか配偶者の生死が不明な状態にあり、合計所得金額が500万円以下の人、寡婦控除は、離婚・配偶者の死別のあと婚姻をしておらず、扶養親族がいる等の条件を満たす合計所得金額500万円以下の女性(ひとり親控除対象者除く)"
         onChange ={(e : React.ChangeEvent<HTMLInputElement>) => {
           setParams({...params, "dokushin_type" : Number(e.target.value)})
        }}
      / >

      <InputRadioRow
         title = "⑱　勤労学生控除"
         name = "gakusei_type"
         values = {{"該当なし": "0", "勤労学生控除対象":"1"}}
         selected = {""+params["gakusei_type"]}
         description = "本人の合計所得金額が75万円以下で給与などの勤労による所得があり、かつ勤労に基づく所得以外の所得が10万円以下で、条件を満たす学校の学生・生徒"
         onChange ={(e : React.ChangeEvent<HTMLInputElement>) => {
           setParams({...params, "gakusei_type" : Number(e.target.value)})
        }}
      / >

      {/*
      <ImputRow
        id=""
        name=""
        type=""
        description = ""
        onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
          setParams({...params})
        }}
      / >


      <ImputRow
        id=""
        name=""
        type=""
        description = ""
        onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
          setParams({...params})
        }}
      / >
      */}



      <div className="d-flex align-items-center text-white bg-primary px-3 mt-5">
        <h3 className="h2 my-0">試算結果</h3>
      </div>

      <Table striped bordered hover style={{captionSide:"top"}}>
      <caption>収入</caption>
      <thead>
        <tr>
          <th></th>
          <th>項目</th>
          <th>金額</th>
          <th>備考</th>
          <th>説明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>A</td>
          <td>給与所得</td>
          <td>{kyuuyo_shotoku}</td>
          <td>給与所得控除額：{kyuuyo_shotoku_koujo}円</td>
          <td>①課税給与収入と④社保適用外の勤務先から受ける課税給与収入から、それらを基に国が定めた算式で計算した給与所得控除額を差し引いた金額</td>
        </tr>
		<tr>
          <td>B</td>
          <td>その他所得</td>
		  <td>{params["sonota_shotoku"]}</td>
          <td></td>
          <td></td>
		</tr>
        <tr>
          <td>C</td>
          <td>収入合計</td>
          <td>{shotoku}</td>
          <td></td>
          <td>A+B</td>
		</tr>
      </tbody>
      </Table>

      <Table striped bordered hover style={{captionSide:"top"}}>
      <caption>控除</caption>
      <thead>
        <tr>
          <th></th>
          <th>項目</th>
          <th>金額</th>
          <th>備考</th>
          <th>説明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>D</td>
          <td>社会保険料控除(給与天引き分)</td>
          <td>{shaho}</td>
          <th></th>
          <th>①課税給与収入－②社保不算入の額＋③社保のみ算入の非課税報酬額に、厚生年金・健康保険(東京都の協会健保の保険料率)・雇用保険(一般の事業)の従業員負担分の保険料率をかけた金額</th>
        </tr>
        <tr>
            <td>E</td>
            <td>配偶者特別控除</td>
            <td>{haiguusha_tokubetsu_koujo}</td>
        </tr>
        <tr>
            <td>F</td>
            <td>障害者控除</td>
            <td>{shougaisha_koujo}</td>
            <td>{params["doukyo_tokubetsu_shougai"] + params["tokubetsu_shougai"] + params["shougai"]}人</td>
            <td>(⑬同居特別障害者控除の対象者数＋⑭特別障害者控除の対象者数)×400,000円＋⑮障害者控除の対象者数×270，000円</td>
        </tr>
        <tr>
            <td>G</td>
            <td>ひとり親・寡婦・勤労学生控除</td>
            <td>{kojin_koujo}</td>
            <td></td>
            <td>ひとり親は350,000円、寡婦と勤労学生は各270,000円</td>
        </tr>
        <tr>
            <td>H</td>
            <td>雑損・医療費・小規模企業共済等掛金・社会保険料(給与天引き以外)控除</td>
            <td>{params["koujo"]}</td>
            <td></td>
            <td>⑯の金額</td>
        </tr>
        <tr>
            <td>I</td>
            <td>控除合計</td>
            <td>{koujo}</td>
            <td></td>
            <td>D+E+F+G+H</td>
        </tr>
      </tbody>
      </Table>

      <Table striped bordered hover style={{captionSide:"top"}}>
          <caption>基準額</caption>
          <thead>
              <tr>
                  <th></th>
                  <th>項目</th>
                  <th>金額</th>
                  <th>説明</th>
              </tr>
          </thead>
          <tbody>
          <tr>
              <td>J</td>
              <td>半額支給停止の基準額</td>
              <td>{3704000+kasan}</td>
              <td>3,704,000円+(⑦16歳未満の扶養親族の人数+⑧16～18歳の扶養親族の人数+⑨特定扶養親族の人数)×630,000+(⑩老人扶養親族(同居老親等以外)の人数+⑪老人扶養親族(同居老親等)の人数)×480,000円+⑫一般の扶養親族の人数×380,000円に、⑥配偶者の状況が一般の控除対象であれば380,000円、老人控除対象であれば480,000円を加算した金額</td>
          </tr>
          <tr>
              <td>K</td>
              <td>全額支給停止の基準額</td>
              <td>{4721000+kasan}</td>
              <td>4,721,000円+上段と同じ加算額</td>
          </tr>
      </tbody>
      </Table>

          <p>判定結果：{
            (shotoku-koujo)>(4721000+kasan)
                ? "全額支給停止(超過額："+((shotoku-koujo)-(4721000+kasan))+"円"
                : (
                    (shotoku-koujo)>(3704000+kasan)
                    ? "半額支給停止(超過額："+((shotoku-koujo)-(3704000+kasan))+"円、全額支給停止まで:"+((4721000+kasan)-(shotoku-koujo))+"円)"
                    : "支給停止なし(半額支給停止まで："+((3704000+kasan)-(shotoku-koujo))+"円)"
                )
          }
          </p>
    </>
  );
}


export default App;