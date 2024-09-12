export const Block = props => {
    if (!props.state.cart) {
        props.state.cart = []
      }
    return <c-c style={{
        width: 150, height: 290, minWidth: 150, margin: "10px 10px", position: "relative",flex:1,
        backgroundColor: "white", boxShadow: "0 0 9px black",
        borderRadius: 10,
    }}
        class={global.styles.hoverzoom_nofade_light}>
        {<img
            // className={global.styles.hover}
            src={props.book.imagelink}
            style={{
                height: 200, width: "98%", objectFit: "fill",
                 minWidth: 150, borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                margin:"1px 2px"
            }}
            onClick={() => {
                props.state.form = "bookspecs"
                props.state.book = props.book
                props.refresh()
            }} />}

        <f-cc style={{ direction:"ltr",padding:"5px 8px" }}>
            <f-12>{props.book.title}</f-12>
        </f-cc>
        <br-x/>
        <br-x/>
        <f-csb style={{ width: "100%", padding: "5px 5px" }}>

            <div>
                {props.state.cart.includes(props.book.title) ?
                    <img src="https://cdn.ituring.ir/research/6/tik.png"
                        style={{ height: 55, objectFit: "contain", position: "absolute", bottom: -2, right: -5 }} /> :
                    <img src="https://cdn.ituring.ir/research/6/buy.png"
                        style={{ height: 30, width: 30, objectFit: "contain", position: "absolute", bottom: 10, right: 10 }} />}
            </div>

            <c-x style={{ direction: "ltr", }}>
                <f-12 style={{ color: "gray" }}><del>{((props.book.price) * 1.1 as number).toLocaleString("fa-IR")} تومان</del></f-12>
                <f-14><b>{((props.book.price) as number).toLocaleString("fa-IR")} تومان</b></f-14>
            </c-x>
        </f-csb>
    </c-c>
}



