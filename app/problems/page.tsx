"use client";

import type { NextPage } from 'next'
import Image from 'next/image'
import Footer from '@/components/footer'
import MyHead from '@/components/head'
import MyNavbar from '@/components/navbar'
import contestsData from '@/data/contests.json'
import problemsData from '@/data/problems.json'
import Probcard from '@/components/probcard'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { useDebounce } from 'usehooks-ts'
import React, { KeyboardEvent } from 'react';
import { Button, ButtonGroup, Collapse, OverlayTrigger, Popover, ToggleButton, Tooltip } from 'react-bootstrap'
import { FaChalkboardTeacher, FaCheckSquare, FaClipboard, FaComment, FaExclamationCircle, FaHeart, FaLightbulb, FaRandom, FaSearch, FaShare, FaSlash, FaSortDown, FaSortUp, FaTrash } from 'react-icons/fa'
import { FaCircleXmark } from 'react-icons/fa6';
import { TbLanguageHiragana } from "react-icons/tb";
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from 'app/api/db/route'
import { encode } from 'js-base64';
import { compress0, expand0, from64, to64 } from 'lib/bool2base64';
import { useRouter, useSearchParams } from 'next/navigation';

export interface Prob {
  id: number,
  title: string,
  titlejp?: string,
  link?: string,
  problink?: string,
  solutionlink?: string,
  probmaterial?: string,
  venue: string,
  venuedetail?: string,
  year?: number,
  team?: string,
  number: string | number,
  topic?: string,
  author?: string,
  category?: string[],
  probcorrection?: string,
  solcorrection?: string,
  explanationlinks?: string[],
  difficulty?: {
    typical: number,
    typicalStar: number,
  },
  diffeach?: {
    name: string,
    diff: number,
  }[],
  hint?: {
    name: string,
    value: string[],
  },
  translation?: {
    name: string,
    value: string,
  },
  sketch?: {
    name: string,
    value: string,
  },
  description?: string,
  draft?: boolean,
  memo?: string,
}

export const utilities = [
  {
    id: "probcorrection",
    title: "問題訂正",
    dataContent: "",
    icon: <FaExclamationCircle />,
  },
  {
    id: "solcorrection",
    title: "解答訂正",
    dataContent: "解答の訂正あり",
    icon: <FaExclamationCircle />,
  },
  {
    id: "translation",
    title: "翻訳・注釈",
    dataContent: "詳細ページに翻訳・注釈あり",
    icon: <TbLanguageHiragana />,
    icon2: <TbLanguageHiragana className='' style={{ color: "#7b372f" }} />,
  },
  {
    id: "hint",
    title: "ヒント",
    dataContent: "ヒントあり",
    icon: <FaLightbulb />,
    icon2: <FaLightbulb className='' style={{ color: "var(--bs-yellow)" }} />,
  },
  {
    id: "explanationlinks",
    title: "詳しい解説",
    dataContent: "",
    icon: <FaChalkboardTeacher />,
    icon2: <FaChalkboardTeacher className='' />,
  },
  {
    id: "done",
    title: "挑戦済み",
    dataContent: "",
    icon: <FaCheckSquare />,
    icon2: <FaCheckSquare className='' style={{ color: "var(--bs-teal)" }} />,
  },
  {
    id: "notdone",
    title: "非挑戦済み",
    dataContent: "",
    icon: <FaCheckSquare />,
    icon2: <span className='fa-layers'>
      <FaCheckSquare className='svg-inline--fa' style={{ color: "var(--bs-teal)" }} />
      <FaSlash className='svg-inline--fa' />
    </span>,
  },
  {
    id: "like",
    title: "お気に入り",
    dataContent: "",
    icon: <FaHeart />,
    icon2: <FaHeart className='' style={{ color: "red" }} />,
  },
]

//utility のフィルター機能実装

const VENUES = ["IOL", "APLO", "JOL", "Onling", "海外予選", "kotohazi", "非LO"];
const CATEGORIES = ["統語", "形態", "音韻", "韻律", "文字", "命数", "意味", "その他"];
const UTILITIES_LIST = ["translation", "hint", "explanationlinks", "done", "notdone", "like"];
const PRIVATE_UTILITIES_LIST = new Set(["done", "notdone", "like"]);
const utilIcons = utilities.filter((v) => (UTILITIES_LIST.includes(v.id))).map((v) => (v))

const Problems: NextPage = () => {
  const [isShareShowing, setIsShareShowing] = useState(false);
  const [isShareFilterOn, setIsShareFilterOn] = useState(false);
  const [isOnlyShareFilterOn, setIsOnlyShareFilterOn] = useState(false);
  const [checkedRaw, setChecked] = useState({
    year: [] as string[],
    difficulty: [] as string[],
    venue: [] as string[],
    team: [false, false],
    category: [] as string[],
    otherCategory: [] as string[],
    utility: [] as string[],
    sort: {
      year: "desc" as "asc" | "desc",
      difficulty: "desc" as "asc" | "desc",
    },
    sortSelected: "" as "" | "year" | "difficulty" | "shuffle"
  })

  const checked = useDebounce(checkedRaw, 150);

  const [filterAnd, setFilterAnd] = useState({
    category: false,
    utility: false,
  })

  const setFiltersToInit = () => {
    setChecked({
      year: [],
      difficulty: [],
      venue: [],
      team: [false, false],
      category: [],
      otherCategory: [],
      utility: [],
      sort: {
        year: "desc",
        difficulty: "desc",
      },
      sortSelected: "",
    })
    setFilterAnd({
      category: false,
      utility: false,
    })
    setQsValue("")
  }

  const [qsValue, setQsValue] = useState<string>('')
  const debouncedQsValue = useDebounce<string>(qsValue, 500)

  const filter = useMemo(() => {
    const qs = new RegExp("(title:(?<title>[^\\s]+)|venue:(?<venue>[^\\s]+))", "gi")
    const qsMatchSplit = debouncedQsValue.match(qs)?.map((v) => {
      return v.split(":")
    })
    const found = qsMatchSplit ? Object.fromEntries(qsMatchSplit as string[][]) : {}
    return {
      qs: debouncedQsValue.replaceAll(qs, ""),
      title: found?.title as string,
      venue: found?.venue as string,
    }
  }, [debouncedQsValue]);

  // DexieのHooksを使って、DBのデータを読み込む
  const dones = useLiveQuery(
    async () => (db.dones.toCollection().primaryKeys())
  ) || [] as number[];
  const likes = useLiveQuery(
    async () => (db.likes.toCollection().primaryKeys())
  ) || [] as number[];

  //いいね機能

  const setDB = async (type: "dones" | "likes", id: number, action: boolean) => {
    try {

      // DBにデータを追加
      if (action) {
        await db[type].put({ id: id });
      } else {
        await db[type].delete(id);
      }

    } catch (error) {
    }
  }

  const contests = useMemo(() => (contestsData.map((v: any, i) => {
    return <li key={v.venue + v.year}>{v.venue + v.year}</li>
  })), []);

  const otherCategories = useMemo(() => uniq(problemsData.reduce((p, c: Prob) => {
    return p.concat(c.category ? c.category : [])
  }, [] as string[])).filter((v: string) => (v[0] !== "!" && !CATEGORIES.includes(v))).sort(), []);

  const filteredProbs = useMemo(() => (problemsData
    .map((v) => {
      return { ...v, venueYear: (v.venue || "") + (v.venuedetail || "") + (v.year || "") + "-" + (v.team ? v.team + "-" : "") + (v.number || "") }
    })
    .filter((v) => {
      if (v.draft) return false;
      if (isOnlyShareFilterOn) {
        // return sharedProbs[v.id]; // TODO
      }
      let flag = false
      flag = (filter.qs ? Object.entries(v).reduce((p, c) => {
        if (["title", "titlejp", "venueYear", "topic"].includes(c[0])) {
          // return p || c[1].toLowerCase().includes(filter.qs.toLowerCase())
          return p || filter.qs.trim().toLowerCase().split(" ").some((qsSplit) => (c[1].toLowerCase().includes(qsSplit)))
        } else return p
      }, false) : true)
        // && (isShareFilterOn ? sharedProbs[v.id] : true) // TODO
        && (filter.title ? v.title.includes(filter.title) || (v.titlejp ? v.titlejp!.includes(filter.title) : false) : true)
        && (filter.venue ? filter.venue === v.venue : true)
        && ((checked.year.length > 0 && v.year) ? checked.year.includes(v.year!.toString()) : true)
        && (v.difficulty ? checked.difficulty.length > 0 ? checked.difficulty.includes(v.difficulty.typicalStar!.toString()) : true : checked.difficulty.length === 0 || checked.difficulty.includes("未定"))
        && ((checked.venue.length > 0 && v.venue) ? checked.venue.includes(v.venue) : true)
        && (checked.team[0] ? !v.team : checked.team[1] ? !!v.team : true)
        // && (v.category ? [...checked.category, ...checked.otherCategory].length > 0 ? v.category.some((vc) => ([...checked.category, ...checked.otherCategory].includes(vc))) : true : checked.category.length === 0 || (checked.category.includes("その他") && checked.otherCategory.length === 0) || [...checked.category, ...checked.otherCategory].includes("未定"))
        && (
          (() => {
            const concatCategory = checked.category.length === 0 ? [] : [...checked.category, ...checked.otherCategory];
            if (v.category && v.category.filter((cat) => (cat !== "未分類")).length > 0) {
              if (concatCategory.length > 0) {
                if (filterAnd.category) {
                  return concatCategory.filter((c) => (c !== "その他")).every((c) => (v.category.includes(c)))
                } else return v.category.some((vc) => (concatCategory.includes(vc)))
              } else { return true }
            } else {
              return checked.category.length === 0 || (checked.category.includes("その他") && checked.otherCategory.length === 0) || concatCategory.includes("未分類")
            }
          })()
        ) && (checked.utility.length > 0 ?
          [
            checked.utility.includes("done") && dones ? dones.includes(v.id) : filterAnd.utility,
            checked.utility.includes("like") && likes ? likes.includes(v.id) : filterAnd.utility,
            checked.utility.includes("notdone") && dones ? !dones.includes(v.id) : filterAnd.utility,
            checked.utility.includes("translation") ? !!v.translation : filterAnd.utility,
            checked.utility.includes("hint") ? !!v.hint : filterAnd.utility,
            checked.utility.includes("explanationlinks") ? !!v.explanationlinks : filterAnd.utility,
          ].reduce((p, c) => {
            return filterAnd.utility ? (p && c) : (p || c);
          }, filterAnd.utility) : true
        )
      return flag
    })
    .sort((a, b) => {
      switch (checked.sortSelected) {
        case "year":
          return (checked.sort.year !== "desc" ? 1 : -1) * ((a.year || -2) - (b.year || -2))
          break;
        case "difficulty":
          return (checked.sort.difficulty !== "desc" ? 1 : -1) * ((a.difficulty?.typical || 0) - (b.difficulty?.typical || 0))
          break;
        case "shuffle":
          return Math.random() - 0.5
          break;
        default:
          return a.id - b.id;
      }
    })), [checked.category, checked.difficulty, checked.otherCategory, checked.sort.difficulty, checked.sort.year, checked.sortSelected, checked.team, checked.utility, checked.venue, checked.year, dones, filter.qs, filter.title, filter.venue, filterAnd.category, filterAnd.utility, likes]);

  useEffect(() => {
    console.log("filteredProbs")

  }, [filteredProbs]);

  const [shareTitleValue, setShareTitleValue] = useState<string>('');
  const debouncedShareTitleValue = useDebounce<string>(shareTitleValue, 500);

  const quicksearch = (
    <>
      <Form.Control
        id="quicksearch"
        placeholder='検索'
        onChange={(e) => setQsValue(e.target.value)}
        className="mb-3"
      />
    </>
  )
  function uniq(array: any[]) {
    return array.filter((elem, index, self) => self.indexOf(elem) === index);
  }

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>, probs: string[] | number[], cat: keyof typeof checked, checkedArray: string[]) => {
    const v = e.currentTarget.value;
    let tmp = checkedArray.slice();
    const isChecked = checkedArray.includes(v);
    if (!isChecked) {
      if (probs.length === checkedArray.length + 1) {
        tmp = [];
      } else {
        tmp.push(v);
      }
    } else {
      tmp = tmp.filter((f) => (f !== v));
    }
    setChecked((prev) => ({ ...prev, [cat]: tmp }))
    // console.log(checked, checkedArray.includes(v));
  }

  const filterItem = (probs: string[] | number[], cat: keyof typeof checkedRaw, checkedArray: string[], content: Function, zeroChecked = true) => (
    probs.map((v: string | number, i) => {
      const tmp = checkedArray;
      const isChecked = zeroChecked && tmp.length === 0 || tmp.includes(v.toString());
      return v ? <ToggleButton
        key={`${cat}-${v}`}
        id={`${cat}-${v}`}
        type="checkbox"
        checked={isChecked}
        onChange={(e) => handleFilterChange(e, probs, cat, checkedArray)}
        value={v}
        variant={isChecked ? "primary" : "light"}
        className='me-1 my-1 py-1 px-2 shadow-none'
        style={{ transition: ".15s all ease" }}
      >{content(v, i)}

      </ToggleButton> : <></>
    })
  )

  const filterAndItem = (cat: keyof typeof filterAnd) => {
    return <ToggleButton
      key={`${cat}-and`}
      id={`${cat}-and`}
      type="checkbox"
      checked={filterAnd[cat]}
      onChange={(e) => setFilterAnd({ ...filterAnd, [cat]: e.currentTarget.checked })}
      value="1"
      variant={filterAnd[cat] ? "info" : "light"}
      className='me-1 my-1 py-1 px-2 shadow-none'
      style={{ transition: ".15s all ease" }}
    >&amp;</ToggleButton>
  }

  const sortItem = (key: keyof typeof checked.sort, name: string) => {
    return <ToggleButton
      key={`${key}-sort`}
      id={`${key}-sort`}
      type="checkbox"
      checked={checked.sortSelected === key}
      onChange={(e) => setChecked(
        checked.sortSelected === key ?
          { ...checked, sort: { ...checked.sort, [key]: checked.sort[key] !== "desc" ? "desc" : "asc" } }
          : { ...checked, sortSelected: key }
      )}
      value="1"
      variant={checked.sortSelected === key ? "primary" : "light"}
      className='my-1 py-1 px-2 shadow-none'
      style={{ transition: ".15s all ease" }}
    >{name}
      {checked.sort[key] !== "asc" ?
        <FaSortDown /> :
        <FaSortUp />}
    </ToggleButton>
  }

  const probcards = useMemo(() => (filteredProbs
    .map((v) => {
      return (
        <div className='col' key={v.id}>
          <Probcard
            prob={v}
            detailed={false}
            bookmarks={[dones.includes(v.id), likes.includes(v.id)]}
            // onBookmarkChange={(type: keyof typeof bookmarks, id: number, checked: boolean) => {
            //   setBookmarks({ ...bookmarks, [type]: checked ? bookmarks[type].concat(id) : bookmarks[type].filter((v) => (v !== id)) })
            // }}
            onBookmarkChange={setDB}
          ></Probcard>
        </div>
      )
    })), [dones, filteredProbs, likes])

  //URL生成
  const COMPRESS_ORDER: ({
    state: string[],
    order: string[],
    type?: "number",
    len: number,
  } | {
    state: boolean[],
    order: string[],
    type: "boolean",
    len: number,
  } | {
    type: "none",
    len: number,
  })[] = useMemo(() => [
    {
      state: checked.venue,
      order: ["IOL", "APLO", "JOL", "Onling", "海外予選", "kotohazi", "非LO"],
      len: 8,
    },
    {
      state: checked.category,
      order: ["統語", "形態", "音韻", "韻律", "文字", "命数", "意味", "その他"],
      len: 8,
    },
    {
      state: checked.utility,
      order: ["translation", "hint", "explanationlinks", "done", "notdone", "like"],
      len: 8,
    },
    {
      state: checked.team,
      order: [],
      type: "boolean",
      len: 2
    },
    {
      state: [filterAnd.category, filterAnd.utility],
      order: [],
      type: "boolean",
      len: 2
    },
    {
      state: checked.difficulty,
      order: ["未定", "1"],
      type: "number",
      len: 16
    },
    {
      type: "none",
      len: 22
    },
    {
      state: checked.year,
      order: ["未定", "2003"],
      type: "number",
      len: 64
    },
  ], [checked.category, checked.difficulty, checked.team, checked.utility, checked.venue, checked.year, filterAnd.category, filterAnd.utility])

  const genURL = useMemo(() => {
    console.log("genURL");
    let query = {
      s: "",
      v: "",
      t: "",
      c: "",
      o: "",
    };
    let boollist: boolean[] = [];
    query.s = encode(debouncedShareTitleValue, true);

    // 絞り込みが private な状態か判定
    if (checked.utility.some((v) => (PRIVATE_UTILITIES_LIST.has(v)))) {
      query.v = "p";
      for (const v of filteredProbs) {
        boollist[v.id] = true;
      }
    }
    else {
      query.v = "2";
      query.t = encode(debouncedQsValue || "", true);
      if (checked.otherCategory.length > 0) {
        query.o = encode(checked.otherCategory.join("|"))
      }
      let offset = 0;
      for (const item of COMPRESS_ORDER) {
        if (item.type === "number") {
          for (let i = 0; i < item.len; i++) {
            boollist[offset + i] = item.state.includes(item.order[i] || String(Number(item.order[item.order.length - 1]) + i - (item.order.length - 1)));
          }
        }
        else if (item.type === "none") {
          for (let i = 0; i < item.len; i++) {
            boollist[offset + i] = false;
          }
        }
        else if (item.type === "boolean") {
          for (let i = 0; i < item.len; i++) {
            boollist[offset + i] = item.state[i] || false;
          }
        }
        else if (!item.type) {
          for (const v of item.state) {
            boollist[offset + item.order.indexOf(v)] = true;
          }
        }
        offset += item.len;
      }
    }
    if (boollist.length) {
      query.c = compress0(to64(boollist));
    }
    let queryString = new URLSearchParams(query);
    let genurl = location.origin + '/problems/?' + queryString.toString();
    return genurl;
  }, [debouncedShareTitleValue, checked.utility, checked.otherCategory, filteredProbs, debouncedQsValue, COMPRESS_ORDER]);

  // 初回 Mount 時に URL クエリがあればそこから checked などの状態を復元．
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    if (searchParams.has("v") && searchParams.has("c")) {
      const boollist = from64(expand0(searchParams.get("c") || ""));
      if (searchParams.get("v") === "p") {

      }
    }
    router.replace("/problems/");
  }, []);

  useEffect(() => {
    setIsCopied(false);
  }, [genURL]);

  const copyToClipboard = async (resultText: string) => {
    await global.navigator.clipboard.writeText(resultText);
  };

  const [isCopied, setIsCopied] = useState(false);

  const sharePopover = (
    <Popover>
      <Popover.Header as="h3">
        <div className="d-flex">
          <span className="me-auto align-self-center">
            <FaSearch className="fa-fw" />
            検索結果をシェア！
          </span>
          <OverlayTrigger overlay={
            <Tooltip>{isCopied ? "Copied!" : "Copy"}</Tooltip>
          }>
            <Button className="btn btn-primary btn-sm text-white rounded-circle"
              onClick={async () => {
                await copyToClipboard(genURL);
                setIsCopied(true);
              }}>
              <FaClipboard />
            </Button>
          </OverlayTrigger>
        </div>
      </Popover.Header>
      <Popover.Body>
        <Form.Control type="text"
          placeholder="タイトル？"
          onChange={(e) => {
            setShareTitleValue(e.target.value);
          }}
          className="mb-2" />
        <a href={genURL} target='_blank'>{genURL}</a>
      </Popover.Body>
    </Popover>
  )

  return (
    <div>
      <MyNavbar></MyNavbar>
      <main className='px-2 px-md-5 pt-3'>

        <h1>
          問題集
        </h1>

        <div
          id="private-title"
          className="align-items-center p-3 mt-3 d-flex"
          style={{ border: "solid 1px 0 gray" }}
        >
          <p className="me-auto d-inline-flex mb-0">
            <FaShare className='align-self-center me-2' />
            <span className='lead'>{ }</span>
          </p>
          <div id="private-filter-btngroup">
            <ToggleButton
              type="checkbox"
              variant="primary"
              className="mb-2"
              checked={isOnlyShareFilterOn}
              value="1"
              onChange={(e) => setIsOnlyShareFilterOn(e.currentTarget.checked)} // shareFilter を一次的に除去
              aria-controls="search-filters"
              aria-expanded={!isOnlyShareFilterOn}
            >
              <FaShare className='fa-fw' />これだけ
            </ToggleButton>
            <Button
              // onClick={ } // shareFilter を除去
              value="1"
              variant={"light text-danger"}
              className='ms-1 my-1 py-1 px-2 shadow-none'
              style={{ transition: ".15s all ease" }}
            >
              <FaTrash className='fa-fw' />CLEAR
            </Button>
          </div>
        </div>
        <div>
          <Collapse in={!isOnlyShareFilterOn}>
            <div id="search-filters">
              {quicksearch}
              <div>
                <span>出題元</span>
                <div className='d-inline-block ms-1'>
                  {filterItem(VENUES, "venue", checkedRaw.venue, (v: string) => (v))}
                </div>
              </div>
              {checkedRaw.venue.length > 0 ? <div>
                <span>年</span>
                <div className='d-inline-block ms-1'>
                  {filterItem(uniq(problemsData
                    .filter((v) => (checkedRaw.venue.length ? checkedRaw.venue.includes(v.venue) : true))
                    .map((v: Prob) => {
                      return v.year || "未定"
                    })).filter((v) => (v)).sort(), "year", checkedRaw.year, (v: string | number) => (v === -1 ? "sample" : v))}
                </div>
              </div> : <></>}
              <div>
                <span>難易度</span>
                <div className='d-inline-block ms-1'>
                  {filterItem(uniq(problemsData.map((v: Prob) => {
                    return (v.difficulty?.typicalStar) || "未定"
                  })).filter((v) => (v)).sort(), "difficulty", checkedRaw.difficulty, (v: string | number) => (`★${v}`))}
                </div>
              </div>
              <div>
                <span>ジャンル</span>
                <div className='d-inline-block ms-1'>
                  {filterAndItem("category")}
                  {filterItem(CATEGORIES, "category", checkedRaw.category, (v: string | number) => (`${v}`))}
                </div>
                <div>
                  {checkedRaw.category.includes("その他") ? filterItem(otherCategories, "otherCategory", checkedRaw.otherCategory, (v: string | number) => (`${v}`)) : <></>}
                </div>
              </div>
              <div>
                <span>便利</span>
                <div className='d-inline-block ms-1'>
                  {filterAndItem("utility")}
                  {filterItem(UTILITIES_LIST, "utility", checkedRaw.utility, (v: string | number, i: number) => (utilIcons[i].icon2), false)}
                </div>
              </div>
            </div>
          </Collapse>
          <div>
            <span>ソート</span>
            <ButtonGroup>
              {sortItem("year", "年")}
              {sortItem("difficulty", "難易度")}
            </ButtonGroup>
            <Button
              key={`shuffle`}
              id={`shuffle`}
              onClick={(e) => setChecked((prev) =>
                ({ ...prev, sortSelected: "shuffle" })
              )}
              value="1"
              variant={"primary"}
              className='ms-1 my-1 py-1 px-2 shadow-none text-white'
              style={{ transition: ".15s all ease" }}
            >
              <FaRandom />
            </Button>
          </div>
        </div>

        <div className='d-flex mb-4'>
          <p className='text-muted mb-0 align-self-center'>—— {probcards.length}問</p>
          <OverlayTrigger trigger={["click"]} overlay={sharePopover} onToggle={(nextShow) => setIsShareShowing(nextShow)}>
            <Button
              id="share"
              value="1"
              variant={"light"}
              className='ms-auto my-1 py-1 px-2 shadow-none'
              style={{ transition: ".15s all ease" }}
            >
              {isShareShowing ? <><FaCircleXmark className="fa-fw" />CLOSE</> :
                <><FaShare className="fa-fw" />SHARE</>
              }
            </Button>
          </OverlayTrigger >
          <Button
            id="clear"
            onClick={setFiltersToInit}
            value="1"
            variant={"light text-danger"}
            className='ms-1 my-1 py-1 px-2 shadow-none'
            style={{ transition: ".15s all ease" }}
          >
            <FaTrash className='fa-fw' />CLEAR
          </Button>
        </div>
        <div className='container'>
          <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-3'>
            {probcards}
          </div>
        </div>
        <ul>
          {contests}
        </ul>
      </main>

      <Footer></Footer>
    </div>
  )
}

export default Problems
