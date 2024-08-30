import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import css from '@/styles/css.module.css'
import WindowFloat from '../Libs/WindowFloat';
import './css.module.css';
import { start } from 'repl';
import { Block } from './Block';

export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles
  let total_price = 0
  let benefit = 0

  getProps(async ()=>{
    let cart=localStorage.getItem("cart")
    if(cart)
    {
      state.cart=JSON.parse(cart)
    }
  })

  if (!state.cart) {
    state.cart = []
  }
  for (let title of state.cart) {
    let book = props.books.find(b => b.title == title)
    if (book) {
      total_price += (book.price)
      benefit += (book.price * 0.1)
    }
  }

  return (
    <div style={{ direction: "rtl", minHeight: "11vh", }}>
      <br-x />
      <Window title={"سبد خرید"} style={{ minHeight: 80, margin: 10, width: "calc(100% - 20px)" }}>
        {/* <pre style={{ direction: "ltr" }}>{JSON.stringify(props, null, 2)}</pre> */}
        <br />
        <f-cse style={{}}>
          <f-14>
            قابل پرداخت :  <f-14 style={{ textDecoration: "underline" }}>{total_price.toLocaleString("fa-IR")}</f-14>  تومان
          </f-14>
          <f-14>
            تعداد کتاب های موجود در سبد خرید : <f-14 style={{ textDecoration: "underline" }}>{state.cart.length.toLocaleString("fa-IR")}</f-14> عدد
          </f-14>
          <f-14>میزان سود شما از این خرید : <f-14 style={{ color: "forestgreen", textDecoration: "underline" }}>{benefit.toLocaleString("fa-IR")}</f-14> تومان</f-14>
        </f-cse>
      </Window>

      {state.form == "bookspecs" ? <WindowFloat title="مشخصات کتاب" onclose={() => {
        delete state.form
        refresh()
      }}>
        {/* <pre>{JSON.stringify(state.book,null,2)}</pre> */}
        <f-c>
          <f-15>نام کتاب:</f-15>
          <sp-2 />
          <f-15>{state.book.title}</f-15>
        </f-c>

        <f-c>
          <f-15>نویسنده:</f-15>
          <sp-2 />
          <f-15>{state.book.author}</f-15>
        </f-c>

        <f-c>
          <f-15>کشور:</f-15>
          <sp-2 />
          <f-15>{state.book.country}</f-15>
        </f-c>

        <f-c>
          <f-15>زبان:</f-15>
          <sp-2 />
          <f-15>{state.book.language}</f-15>
        </f-c>

        <f-c>
          <f-15>تعداد صفحات:</f-15>
          <sp-2 />
          <f-15>{state.book.pages.toLocaleString("fa-IR")} صفحه</f-15>
        </f-c>

        <f-c>
          <f-15>سال انتشار:</f-15>
          <sp-2 />
          <f-15>{(state.book.year as number).toLocaleString("fa-IR")} میلادی</f-15>
        </f-c>

        <f-c>
          <f-15>قیمت:</f-15>
          <sp-2 />
          <f-15>{state.book.price.toLocaleString("fa-IR")} تومان</f-15>
        </f-c>

        <f-x style={{ direction: "ltr" }}>
          <g-b style={{
            height: 30, margin: "5px 5px", maxWidth: 150,
            backgroundColor: state.cart.includes(state.book.title) ?
              "#FA3636D8" : "#29E454A6", color: "#080808",
            borderRadius: "10px"
          }}
            onClick={() => {
              if (state.cart.includes(state.book.title)) {
                state.cart = state.cart.filter(bookname => state.book.title != bookname)
                localStorage.setItem("cart",JSON.stringify(state.cart))
                state.form = null
                refresh()
                alert(" کتاب" + " " + state.book.title + " " + " از سبد خرید شما حذف گردید")
              }
              else {
                state.cart.push(state.book.title)
                localStorage.setItem("cart",JSON.stringify(state.cart))
                state.form = null
                refresh()
              }
            }}>
            {state.cart.includes(state.book.title) ?
              <f-13>حذف از سبد خرید</f-13> : <f-13>افزودن به سبد خرید</f-13>
            }
          </g-b>
        </f-x>
      </WindowFloat> : null}
      <Window title={"خوش آمدید"} style={{ minHeight: 200, margin: 10, width: "calc(100% - 20px)", gap: 10 }}>
        <c-c style={{ width: "100%" }}>
          <w-cse style={{}}>
            {props.books.map(book => {
              return <Block
                book={book}
                state={state}
                refresh={refresh} />
            })}
          </w-cse>
        </c-c>
      </Window>
    </div>
  )
}
export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

  let books = await global.db.collection("books").find({}).toArray()
  for (let book of books) {
    book.imagelink = "https://irmapserver.ir/research/ex/books/" + book.imageLink
  }
  console.log(books)

  return {
    props: {
      data: global.QSON.stringify({
        session,
        books,
        // nlangs,
      })
    },
  }
}