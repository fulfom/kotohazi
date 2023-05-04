import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Badge, Button, ButtonGroup, ButtonToolbar, Overlay, OverlayTrigger, Popover, ToggleButton } from 'react-bootstrap'
import { Prob, utilities } from 'pages/problems';
import { FaCheckSquare, FaHeart } from 'react-icons/fa';

function probcard(props: { prob: Prob, detailed: boolean, bookmarks: boolean[], onBookmarkChange: Function }) {
    const utilsContent = utilities.slice(0, 5)

    const diffstar = ["", "★☆☆☆☆", "★★☆☆☆", "★★★☆☆", "★★★★☆", "★★★★★", <span className='fst-italic fs-5'>★</span>, <span className='fst-italic fs-5'>★★</span>, <span className='fst-italic fs-5'>★★★</span>]

    const detailpath = [
        "/problems",
        `${props.prob.venue === "海外予選" ? ("oversea/" + props.prob.venuedetail) : props.prob.venue}`,
        props.prob.year === -1 ? "sample" : String(props.prob.year),
        props.prob.team ? [props.prob.team, String(props.prob.number)].join("-") : String(props.prob.number)
    ].join("/").toLowerCase();

    const popover = (prob: Prob, util: typeof utilsContent[number], url = "") => (
        <Popover>
            <Popover.Header as="h3">Popover right</Popover.Header>
            <Popover.Body>
                <div className="card web-card d-flex flex-row mb-3">
                    <a href={url} target="_blank"></a>
                    <div className="thumb center">
                        <div className="icon material"><i className="fas fa-icons"></i></div>
                    </div>
                    <div className="card-body p-2">
                        <h5 className="card-title mb-1">{props.prob.title || "必要な追加資料を入手"}</h5>
                    </div>
                </div>
            </Popover.Body>
        </Popover>
    )

    const popoverDiff = (
        <Popover>
            <Popover.Header as="h3">難易度の評定</Popover.Header>
            <Popover.Body>
                {props.prob.diffeach ? props.prob.diffeach!.map((v) => {
                    return `${v.diff} by ${v.name}`
                }).join("; ") : "未定義"}
            </Popover.Body>
        </Popover>
    )

    //未完成
    const ogpcard = () => {
        return (
            <div className="card web-card d-flex flex-row mb-3">
                <a href="{ props.prob.url }" target="_blank"></a>
                <div className="thumb">
                    <img src=" { props.prob.image }" alt="Card image cap " />
                </div>
                <div className="card-body p-2">
                    <div className="d-flex">
                        <a href=" { props.prob.host }" target="_blank">
                            <img src="https://www.google.com/s2/favicons?domain={ props.prob.favicon }" alt="" className=" favicon " />
                        </a>
                        <h5 className="card-title ml-1 mb-1"> {props.prob.title}</h5>
                    </div>
                    <p className="card-text text-muted"> {props.prob.description}</p>
                </div>
            </div>
        )
    }

    const utils = (data: Prob) => {

        let r = [];

        for (const util of utilsContent) {
            if (util.id in data) {
                r.push(
                    <OverlayTrigger key={"prob" + util.id} trigger={["focus"]} overlay={popover(data, util)
                    }>
                        <Badge className='fs-6 text-muted' bg="light" text='dark' tabIndex={0}>{util.icon}</Badge>
                    </OverlayTrigger >
                )
            }
            //hover も使いたいが…… hover, focus は上手くいかない
        }
        return r.length ? (
            <ButtonGroup size='sm' style={{ alignItems: "flex-start" }} >
                {r}
            </ButtonGroup >
        ) : <></>
    }

    return (
        <div className="card generate-with-shadow" style={{ transition: ".15s all ease" }}>
            <div className="card-body">
                <div className="d-flex mb-2">
                    <>
                        <div className="me-auto">
                            <h6 className="card-subtitle mb-2 text-muted">
                                {props.prob.venuedetail || props.prob.venue}{props.prob.year === -1 ? "sample" : props.prob.year}-{props.prob.team ? props.prob.team + "-" : ""}{props.prob.number}
                            </h6>
                            {props.prob.titlejp ? <h6 className="card-subtitle mb-2 text-muted"> {props.prob.title}</h6> : ""}
                        </div>
                        {utils(props.prob)}
                    </>
                </div >
                <h5 className="card-title">{props.prob.titlejp || props.prob.title}</h5>


                <h5 className="card-subtitle mb-2 text-muted">
                    {props.prob.difficulty ?
                        <OverlayTrigger trigger={["hover", "focus"]} overlay={props.prob.diffeach ? popoverDiff : <></>}>
                            <Badge bg="light" text="dark" className='text-muted' tabIndex={0}>{diffstar[Math.trunc(props.prob.difficulty!.typicalStar)]}{props.prob.difficulty!.typical}</Badge>
                        </OverlayTrigger> : <></>}
                    {props.prob.category ? props.prob.category!.map((v) => {
                        return v[0] === "!" ? "" : <Badge key={`${props.prob.id}-${v}`} className="text-muted" bg="light" text="dark">{v}</Badge>
                    }) : <Badge className="m-1 text-muted" bg="light" text="dark">未分類</Badge>}
                </h5>
                {props.detailed ?
                    <p className="card-text text-muted"><hr />主題：{props.prob.topic}<br />作問：{props.prob.author}</p> : <></>
                }
                <div className="d-flex">
                    <a href={props.prob.problink || props.prob.link} className="card-link" target="_blank">問題</a>
                    {props.prob.solutionlink ?
                        <a href={props.prob.solutionlink} className="card-link" target="_blank">解答</a> : <></>}
                    {props.detailed && props.prob.probmaterial ?
                        <a href={props.prob.probmaterial} className="card-link" target="_blank">資料</a> : <></>}
                    {props.detailed && props.prob.problink ? <a href={props.prob.link} className="card-link" target="_blank">掲載元</a> : <></>}
                    {props.detailed ? <></> : <a href={detailpath} className="card-link">詳細</a>}
                    <ToggleButton
                        key={`done-${props.prob.id}`}
                        id={`done-${props.prob.id}`}
                        type="checkbox"
                        checked={props.bookmarks[0]}
                        onChange={(e) => props.onBookmarkChange("dones", props.prob.id, !props.bookmarks[0])}
                        value={"1"}
                        variant={""}
                        className='check-icon ms-auto mb-0 py-1 px-2 shadow-none border-0'
                        style={{ transition: ".15s all ease", color: props.bookmarks[0] ? "var(--bs-teal)" : "#ccc" }}
                    >
                        <FaCheckSquare />
                    </ToggleButton>
                    <ToggleButton
                        key={`like-${props.prob.id}`}
                        id={`like-${props.prob.id}`}
                        type="checkbox"
                        checked={props.bookmarks[1]}
                        onChange={(e) => props.onBookmarkChange("likes", props.prob.id, !props.bookmarks[1])}
                        value={"1"}
                        variant={""}
                        className='check-icon ms-3 mb-0 py-1 px-2 shadow-none border-0'
                        style={{ transition: ".15s all ease", color: props.bookmarks[1] ? "red" : "#ccc" }}
                    >
                        <FaHeart />
                    </ToggleButton>
                </div>
            </div>
        </div>
    )
}

probcard.propTypes = {}

export default probcard