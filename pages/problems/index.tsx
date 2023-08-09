import type { NextPage } from 'next'
import Image from 'next/image'
import Footer from '@/components/footer'
import MyHead from '@/components/head'
import MyNavbar from '@/components/navbar'
import contestsData from '@/data/contests.json'
import problemsData from '@/data/problems.json'
import Probcard from '@/components/probcard'
import { ChangeEvent, useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { useDebounce } from 'usehooks-ts'
import React, { KeyboardEvent } from 'react';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap'
import { FaChalkboardTeacher, FaCheckSquare, FaComment, FaExclamationCircle, FaHeart, FaLightbulb, FaRandom, FaShare, FaSlash, FaSortDown, FaSortUp, FaTrash } from 'react-icons/fa'
import { TbLanguageHiragana } from "react-icons/tb";
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from 'pages/api/db'

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

const Problems: NextPage = () => {
  const VENUES = ["IOL", "APLO", "JOL", "Onling", "海外予選", "kotohazi", "非LO"];
  const CATEGORIES = ["統語", "形態", "音韻", "韻律", "文字", "命数", "意味", "その他"];
  const UTILITIES_LIST = ["translation", "hint", "explanationlinks", "done", "notdone", "like"];
  const utilIcons = utilities.filter((v) => (UTILITIES_LIST.includes(v.id))).map((v) => (v))

  const [checked, setChecked] = useState({
    year: [] as string[],
    difficulty: [] as string[],
    venue: [] as string[],
    category: [] as string[],
    otherCategory: [] as string[],
    utility: [] as string[],
    sort: {
      year: "desc" as "asc" | "desc",
      difficulty: "desc" as "asc" | "desc",
    },
    sortSelected: "" as "" | "year" | "difficulty" | "shuffle"
  })
  const [filter, setFilter] = useState({
    qs: "",
    title: "",
    venue: "",
    year: [],
  });
  const [filterAnd, setFilterAnd] = useState({
    category: false,
    utility: false,
  })

  const setFiltersToInit = () => {
    setChecked({
      year: [],
      difficulty: [],
      venue: [],
      category: [],
      otherCategory: [],
      utility: [],
      sort: {
        year: "desc",
        difficulty: "desc",
      },
      sortSelected: "",
    })
    setFilter({
      qs: "",
      title: "",
      venue: "",
      year: [],
    })
    setFilterAnd({
      category: false,
      utility: false,
    })
    setQsValue("")
  }

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

  const contests = contestsData.map((v: any, i) => {
    return <li key={v.venue + v.year}>{v.venue + v.year}</li>
  })

  const otherCategories = uniq(problemsData.reduce((p, c: Prob) => {
    return p.concat(c.category ? c.category : [])
  }, [] as string[])).filter((v: string) => (v[0] !== "!" && !CATEGORIES.includes(v))).sort()

  const filteredProbs = problemsData
    .map((v) => {
      return { ...v, venueYear: (v.venue || "") + (v.venuedetail || "") + (v.year || "") + "-" + (v.team ? v.team + "-" : "") + (v.number || "") }
    })
    .filter((v) => {
      if (v.draft) return false;
      let flag = false
      flag = (filter.qs ? Object.entries(v).reduce((p, c) => {
        if (["title", "titlejp", "venueYear", "topic"].includes(c[0])) {
          // return p || c[1].toLowerCase().includes(filter.qs.toLowerCase())
          return p || filter.qs.trim().toLowerCase().split(" ").some((qsSplit) => (c[1].toLowerCase().includes(qsSplit)))
        } else return p
      }, false) : true)
        && (filter.title ? v.title.includes(filter.title) || (v.titlejp ? v.titlejp!.includes(filter.title) : false) : true)
        && (filter.venue ? filter.venue === v.venue : true)
        && ((checked.year.length > 0 && v.year) ? checked.year.includes(v.year!.toString()) : true)
        && (v.difficulty ? checked.difficulty.length > 0 ? checked.difficulty.includes(v.difficulty.typicalStar!.toString()) : true : checked.difficulty.length === 0 || checked.difficulty.includes("未定"))
        && ((checked.venue.length > 0 && v.venue) ? checked.venue.includes(v.venue) : true)
        // && (v.category ? [...checked.category, ...checked.otherCategory].length > 0 ? v.category.some((vc) => ([...checked.category, ...checked.otherCategory].includes(vc))) : true : checked.category.length === 0 || (checked.category.includes("その他") && checked.otherCategory.length === 0) || [...checked.category, ...checked.otherCategory].includes("未定"))
        && (
          (() => {
            const concatCategory = checked.category.length === 0 ? [] : [...checked.category, ...checked.otherCategory];
            if (v.category) {
              if (concatCategory.length > 0) {
                if (filterAnd.category) {
                  return concatCategory.filter((c) => (c !== "その他")).every((c) => (v.category.includes(c)))
                } else return v.category.some((vc) => (concatCategory.includes(vc)))
              } else { return true }
            } else {
              return checked.category.length === 0 || (checked.category.includes("その他") && checked.otherCategory.length === 0) || concatCategory.includes("未定")
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
    })

  const [qsValue, setQsValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(qsValue, 500)

  useEffect(() => {
    // Do fetch here...
    // Triggers when "debouncedValue" changes
    const qs = new RegExp("(title:(?<title>[^\\s]+)|venue:(?<venue>[^\\s]+))", "gi")
    const qsMatchSplit = qsValue.match(qs)?.map((v) => {
      return v.split(":")
    })
    const found = qsMatchSplit ? Object.fromEntries(qsMatchSplit as string[][]) : {}

    setFilter({
      ...filter,
      qs: qsValue.replaceAll(qs, ""),
      title: found?.title as string,
      venue: found?.venue as string,
    })
  }, [debouncedValue])

  const handleQsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQsValue(event.target.value)
  }

  const quicksearch = (
    <>
      <Form.Control
        id="quicksearch"
        placeholder='検索'
        value={qsValue}
        onChange={handleQsChange}
        className="mb-3"
      />
    </>
  )
  function uniq(array: any[]) {
    return array.filter((elem, index, self) => self.indexOf(elem) === index);
  }

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>, cat: keyof typeof checked, checkedArray: string[]) => {
    const v = e.currentTarget.value;
    let tmp = checkedArray.slice();
    const isChecked = checkedArray.includes(v);
    if (!isChecked) {
      tmp.push(v)
    } else {
      tmp = tmp.filter((f) => (f !== v))
    }
    setChecked({ ...checked, [cat]: tmp })
    console.log(checked, checkedArray.includes(v));
  }

  const filterItem = (probs: string[] | number[], cat: keyof typeof checked, checkedArray: string[], content: Function, zeroChecked = true) => (
    probs.map((v: string | number, i) => {
      const tmp = checkedArray;
      const isChecked = zeroChecked && tmp.length === 0 || tmp.includes(v.toString());
      return v ? <ToggleButton
        key={`${cat}-${v}`}
        id={`${cat}-${v}`}
        type="checkbox"
        checked={isChecked}
        onChange={(e) => handleFilterChange(e, cat, checkedArray)}
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

  const probcards = filteredProbs
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
    })

  return (
    <div>
      <MyHead></MyHead>
      <MyNavbar></MyNavbar>
      <main className='px-2 px-md-5 pt-3'>

        <h1>
          問題集
        </h1>

        <div>
          {quicksearch}
          <div>
            <span>出題元</span>
            <div className='d-inline-block ms-1'>
              {filterItem(VENUES, "venue", checked.venue, (v: string) => (v))}
            </div>
          </div>
          {checked.venue.length > 0 ? <div>
            <span>年</span>
            <div className='d-inline-block ms-1'>
              {filterItem(uniq(problemsData
                .filter((v) => (checked.venue.length ? checked.venue.includes(v.venue) : true))
                .map((v: Prob) => {
                  return v.year || "未定"
                })).filter((v) => (v)).sort(), "year", checked.year, (v: string | number) => (v === -1 ? "sample" : v))}
            </div>
          </div> : <></>}
          <div>
            <span>難易度</span>
            <div className='d-inline-block ms-1'>
              {filterItem(uniq(problemsData.map((v: Prob) => {
                return (v.difficulty?.typicalStar) || "未定"
              })).filter((v) => (v)).sort(), "difficulty", checked.difficulty, (v: string | number) => (`★${v}`))}
            </div>
          </div>
          <div>
            <span>ジャンル</span>
            <div className='d-inline-block ms-1'>
              {filterAndItem("category")}
              {filterItem(CATEGORIES, "category", checked.category, (v: string | number) => (`${v}`))}
            </div>
            <div>
              {checked.category.includes("その他") ? filterItem(otherCategories, "otherCategory", checked.otherCategory, (v: string | number) => (`${v}`)) : <></>}
            </div>
          </div>
          <div>
            <span>便利</span>
            <div className='d-inline-block ms-1'>
              {filterAndItem("utility")}
              {filterItem(UTILITIES_LIST, "utility", checked.utility, (v: string | number, i: number) => (utilIcons[i].icon2), false)}
            </div>
          </div>
          <div>
            <span>ソート</span>
            <ButtonGroup>
              {sortItem("year", "年")}
              {sortItem("difficulty", "難易度")}
            </ButtonGroup>
            <Button
              key={`shuffle`}
              id={`shuffle`}
              onClick={(e) => setChecked(
                { ...checked, sortSelected: "shuffle" }
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
          <Button
            id="share"
            onClick={setFiltersToInit} //TODO
            value="1"
            variant={"light"}
            className='ms-auto my-1 py-1 px-2 shadow-none'
            style={{ transition: ".15s all ease" }}
          >
            <FaShare className="fa-fw" />
            SHARE</Button>
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
