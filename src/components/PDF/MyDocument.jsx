import { Document, Font, Image, Page, Path, StyleSheet, Svg, Text, View } from "@react-pdf/renderer";
import { baseurl } from "../../config/apiUrl";

import OpenRegular from './OpenSans-Regular.ttf';
import OpenBold from './OpenSans-Bold.ttf';


Font.register({
    family: 'Open Sans',
    src: OpenRegular,
    fontWeight: 'normal'
});

Font.register({
    family: 'Open Sans',
    src: OpenBold,
    fontWeight: '700'
});

const styles = StyleSheet.create({
    bg: {
        backgroundColor: "#ffffff",
        position: 'relative'
    },
    watermark: {
        position: "absolute",
        top: 50,
        left: 5,
        transform: "rotate(-25deg)",
        fontSize: 35,
        color: "rgba(0, 0, 0, 0.1)",
        opacity: 0.2,
        fontWeight: "bold",
        zIndex: 1,
        backgroundColor: 'transparent',
        backgroundClip: "text",
        textFillColor: "transparent"
    }
});

const data = [
    {
        "id": 137,
        "projectid": 46,
        "card_guid": null,
        "textposition": "",
        "type": "",
        "cardside": "front",
        "nodetype": "text",
        "x": 21,
        "y": 114,
        "width": 588,
        "height": 44,
        "styles": {
            "nodeid": 137,
            "styleid": 128,
            "zindex": 0,
            "color": "#000000",
            "bgcolor": "",
            "node_guid": null,
            "ffamily": "Open Sans",
            "fsize": 38,
            "fweight": 400,
            "lheight": 43,
            "lspacing": 0,
            "fstyle": "normal",
            "tdecoration": "none",
            "talign": "left",
            "ofit": "",
            "bradius": null,
            "bwidth": null,
            "bcolor": "",
            "bstyle": "",
            "opacity": null,
            "mtop": null
        },
        "icon": null,
        "text": "Frontend Developer",
        "shapetype": "",
        "image": "",
        "image_url": null,
        "link": "",
        "bgtype": "",
        "bgcolor": "",
        "color": "",
        "qr_url": ""
    },
    {
        "id": 141,
        "projectid": 46,
        "card_guid": null,
        "textposition": "",
        "type": "",
        "cardside": "front",
        "nodetype": "text",
        "x": 21,
        "y": 21,
        "width": 497,
        "height": 44,
        "styles": {
            "nodeid": 141,
            "styleid": 132,
            "zindex": 0,
            "color": "#6d38ff",
            "bgcolor": "",
            "node_guid": null,
            "ffamily": "Open Sans",
            "fsize": 79,
            "fweight": 700,
            "lheight": 84,
            "lspacing": 0,
            "fstyle": "normal",
            "tdecoration": "none",
            "talign": "left",
            "ofit": "",
            "bradius": null,
            "bwidth": null,
            "bcolor": "",
            "bstyle": "",
            "opacity": null,
            "mtop": null
        },
        "icon": null,
        "text": "Srijan Sinha",
        "shapetype": "",
        "image": "",
        "image_url": null,
        "link": "",
        "bgtype": "",
        "bgcolor": "",
        "color": "",
        "qr_url": ""
    },
    {
        "id": 138,
        "projectid": 46,
        "card_guid": null,
        "textposition": "right-center",
        "type": "icon-text",
        "cardside": "front",
        "nodetype": "magictext",
        "x": 21,
        "y": 513,
        "width": 303,
        "height": 66,
        "styles": {
            "nodeid": 138,
            "styleid": 129,
            "zindex": 0,
            "color": "#000000",
            "bgcolor": "",
            "node_guid": null,
            "ffamily": "Open Sans",
            "fsize": 20,
            "fweight": 400,
            "lheight": 24,
            "lspacing": 0,
            "fstyle": "normal",
            "tdecoration": "none",
            "talign": "",
            "ofit": "",
            "bradius": null,
            "bwidth": null,
            "bcolor": "",
            "bstyle": "",
            "opacity": null,
            "mtop": null
        },
        "icon": {
            "iconid": 8,
            "nodeid": 138,
            "node_guid": null,
            "width": 45,
            "height": 45,
            "bwidth": 0,
            "bradius": 0,
            "color": "#000000",
            "bcolor": "#000000",
            "bstyle": "solid",
            "svg": "<svg class=\"w-6 h-6 text-gray-800 dark:text-white\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" width=\"35\" height=\"35\" fill=\"currentColor\" viewBox=\"0 0 24 24\">\r\n<path d=\"M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z\"/>\r\n</svg>",
            "path": "M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z",
            "viewbox": "0 0 24 24",
            "strokelinecap": null,
            "strokewidth": null,
            "fill": "#000000",
            "stroke": null,
            "pathfill": "#000000",
            "pathfillrule": null,
            "pathcliprule": null
        },
        "text": "+91 6290342523",
        "shapetype": "",
        "image": "",
        "image_url": null,
        "link": "",
        "bgtype": "",
        "bgcolor": "",
        "color": "",
        "qr_url": ""
    },
    {
        "id": 139,
        "projectid": 46,
        "card_guid": null,
        "textposition": "right-center",
        "type": "icon-text",
        "cardside": "front",
        "nodetype": "magictext",
        "x": 21,
        "y": 471,
        "width": 298,
        "height": 66,
        "styles": {
            "nodeid": 139,
            "styleid": 130,
            "zindex": 0,
            "color": "#000000",
            "bgcolor": "",
            "node_guid": null,
            "ffamily": "Open Sans",
            "fsize": 20,
            "fweight": 400,
            "lheight": 24,
            "lspacing": 0,
            "fstyle": "normal",
            "tdecoration": "none",
            "talign": "",
            "ofit": "",
            "bradius": null,
            "bwidth": null,
            "bcolor": "",
            "bstyle": "",
            "opacity": null,
            "mtop": null
        },
        "icon": {
            "iconid": 9,
            "nodeid": 139,
            "node_guid": null,
            "width": 45,
            "height": 45,
            "bwidth": 0,
            "bradius": 0,
            "color": "#000000",
            "bcolor": "#000000",
            "bstyle": "solid",
            "svg": "<svg class=\"w-6 h-6 text-gray-800 dark:text-white\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" width=\"35\" height=\"35\" fill=\"none\" viewBox=\"0 0 24 24\">\n  <path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"2\" d=\"m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z\"/>\n</svg>",
            "path": "m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z",
            "viewbox": "0 0 24 24",
            "strokelinecap": 'round',
            "strokewidth": 2,
            "fill": "none",
            "stroke": "#000000",
            "pathfill": null,
            "pathfillrule": null,
            "pathcliprule": null
        },
        "text": "srijan@gmail.com",
        "shapetype": "",
        "image": "",
        "image_url": null,
        "link": "",
        "bgtype": "",
        "bgcolor": "",
        "color": "",
        "qr_url": ""
    },
    {
        "id": 151,
        "projectid": 46,
        "card_guid": null,
        "textposition": "right-center",
        "type": "icon-text",
        "cardside": "front",
        "nodetype": "magictext",
        "x": 21,
        "y": 425,
        "width": 387,
        "height": 66,
        "styles": {
            "nodeid": 151,
            "styleid": 142,
            "zindex": 0,
            "color": "#000000",
            "bgcolor": "",
            "node_guid": null,
            "ffamily": "Open Sans",
            "fsize": 20,
            "fweight": 400,
            "lheight": 24,
            "lspacing": 0,
            "fstyle": "normal",
            "tdecoration": "none",
            "talign": "",
            "ofit": "",
            "bradius": null,
            "bwidth": null,
            "bcolor": "",
            "bstyle": "",
            "opacity": null,
            "mtop": null
        },
        "icon": {
            "iconid": 10,
            "nodeid": 151,
            "node_guid": null,
            "width": 45,
            "height": 45,
            "bwidth": 0,
            "bradius": 0,
            "color": "#000000",
            "bcolor": "#000000",
            "bstyle": "solid",
            "svg": "<svg class=\"w-6 h-6 text-gray-800 dark:text-white\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" width=\"35\" height=\"35\" fill=\"none\" viewBox=\"0 0 24 24\">\n  <path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z\" clip-rule=\"evenodd\"/>\n</svg>",
            "path": "M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z",
            "viewbox": "0 0 24 24",
            "strokelinecap": 'round',
            "strokewidth": null,
            "fill": "none",
            "stroke": null,
            "pathfill": "#000000",
            "pathfillrule": "evenodd",
            "pathcliprule": "evenodd"
        },
        "text": "srijan.dev",
        "shapetype": "",
        "image": "",
        "image_url": null,
        "link": "",
        "bgtype": "",
        "bgcolor": "",
        "color": "",
        "qr_url": ""
    },
    {
        "id": 146,
        "projectid": 46,
        "card_guid": null,
        "textposition": "",
        "type": "",
        "cardside": "back",
        "nodetype": "image",
        "x": 966,
        "y": 443,
        "width": 62,
        "height": 62,
        "styles": {
        "nodeid": 146,
        "styleid": 137,
        "zindex": 0,
        "color": "",
        "bgcolor": "",
        "node_guid": null,
        "ffamily": "",
        "fsize": null,
        "fweight": null,
        "lheight": null,
        "lspacing": null,
        "fstyle": "",
        "tdecoration": "",
        "talign": "",
        "ofit": "cover",
        "bradius": 0,
        "bwidth": 0,
        "bcolor": "#000000",
        "bstyle": "solid",
        "opacity": null,
        "mtop": null
        },
        "icon": null,
        "text": "",
        "shapetype": "",
        "image": "/NFC_Projects/Project_46/Gallery/gallery-2025-01-02_15-38-05.png",
        "image_url": null,
        "link": "",
        "bgtype": "",
        "bgcolor": "",
        "color": "",
        "qr_url": ""
    },
    {
        "id": 145,
        "projectid": 46,
        "card_guid": null,
        "textposition": "",
        "type": "",
        "cardside": "back",
        "nodetype": "image",
        "x": 965,
        "y": 515,
        "width": 64,
        "height": 64,
        "styles": {
            "nodeid": 145,
            "styleid": 136,
            "zindex": 0,
            "color": "",
            "bgcolor": "",
            "node_guid": null,
            "ffamily": "",
            "fsize": null,
            "fweight": null,
            "lheight": null,
            "lspacing": null,
            "fstyle": "",
            "tdecoration": "",
            "talign": "",
            "ofit": "cover",
            "bradius": 0,
            "bwidth": 0,
            "bcolor": "#000000",
            "bstyle": "solid",
            "opacity": null,
            "mtop": null
        },
        "icon": null,
        "text": "",
        "shapetype": "",
        "image": "/NFC_Projects/Project_46/Gallery/gallery-2025-01-02_15-37-32.jpg",
        "image_url": null,
        "link": "",
        "bgtype": "",
        "bgcolor": "",
        "color": "",
        "qr_url": ""
    },
    {
        "id": 147,
        "projectid": 46,
        "card_guid": null,
        "textposition": "",
        "type": "",
        "cardside": "back",
        "nodetype": "image",
        "x": 321,
        "y": 95,
        "width": 408,
        "height": 408,
        "styles": {
        "nodeid": 147,
        "styleid": 138,
        "zindex": 0,
        "color": "",
        "bgcolor": "",
        "node_guid": null,
        "ffamily": "",
        "fsize": null,
        "fweight": null,
        "lheight": null,
        "lspacing": null,
        "fstyle": "",
        "tdecoration": "",
        "talign": "",
        "ofit": "cover",
        "bradius": 0,
        "bwidth": 0,
        "bcolor": "#000000",
        "bstyle": "solid",
        "opacity": null,
        "mtop": null
        },
        "icon": null,
        "text": "",
        "shapetype": "",
        "image": "/vcard-qr/node-qr/147",
        "image_url": null,
        "link": "https://www.linkedin.com/in/client-data-81a415312/",
        "bgtype": "transparent",
        "bgcolor": "#000000",
        "color": "#000000",
        "qr_url": "/vcard-qr/node-qr/147"
    },
    {
        "id": 157,
        "projectid": 46,
        "card_guid": null,
        "textposition": "",
        "type": "",
        "cardside": "front",
        "nodetype": "image",
        "x": 365,
        "y": 0,
        "width": 716,
        "height": 626,
        "styles": {
          "nodeid": 157,
          "styleid": 148,
          "zindex": 0,
          "color": "",
          "bgcolor": "",
          "node_guid": null,
          "ffamily": "",
          "fsize": null,
          "fweight": null,
          "lheight": null,
          "lspacing": null,
          "fstyle": "",
          "tdecoration": "",
          "talign": "",
          "ofit": "cover",
          "bradius": 0,
          "bwidth": 0,
          "bcolor": "#000000",
          "bstyle": "solid",
          "opacity": null,
          "mtop": null
        },
        "icon": null,
        "text": "",
        "shapetype": "",
        "image": "/NFC_Projects/Project_46/Gallery/gallery-2025-01-14_16-13-26.png",
        "image_url": null,
        "link": "",
        "bgtype": "",
        "bgcolor": "",
        "color": "",
        "qr_url": ""
      },
      {
        "id": 160,
        "projectid": 46,
        "card_guid": null,
        "textposition": "bottom-center",
        "type": "logo-text",
        "cardside": "front",
        "nodetype": "magictext",
        "x": 21,
        "y": 251,
        "width": 136,
        "height": 62,
        "styles": {
          "nodeid": 160,
          "styleid": 151,
          "zindex": 0,
          "color": "#000000",
          "bgcolor": "",
          "node_guid": null,
          "ffamily": "Open Sans",
          "fsize": 13,
          "fweight": 700,
          "lheight": 18,
          "lspacing": 0,
          "fstyle": "normal",
          "tdecoration": "none",
          "talign": "",
          "ofit": "",
          "bradius": null,
          "bwidth": null,
          "bcolor": "",
          "bstyle": "",
          "opacity": null,
          "mtop": 0
        },
        "icon": null,
        "text": "Emastersindia.net",
        "shapetype": "",
        "image": "/NFC_Projects/Project_160/Node/image-160.png",
        "image_url": null,
        "link": "",
        "bgtype": "",
        "bgcolor": "",
        "color": "",
        "qr_url": ""
      }
]


const backgrounds = {
    "front": {
      "bgcolor": "#ffffff",
      "side": null,
      "bgimage": "",
      "bgimage_url": "",
      "type": "solid",
      "gradient": {
        "projectid": 0,
        "gradientid": 71,
        "backgroundid": 68,
        "direction": "to right",
        "type": "",
        "side": null,
        "colors": [
          {
            "colorid": 144,
            "gradientid": 71,
            "code": "#ffffff",
            "spread": 18
          },
          {
            "colorid": 145,
            "gradientid": 71,
            "code": "#1e90ff",
            "spread": 92
          }
        ]
      }
    },
    "back": {
      "bgcolor": "#ffffff",
      "side": null,
      "bgimage": "",
      "bgimage_url": "",
      "type": "solid",
      "gradient": {
        "projectid": 0,
        "gradientid": 72,
        "backgroundid": 69,
        "direction": "to right",
        "type": "",
        "side": null,
        "colors": [
          {
            "colorid": 146,
            "gradientid": 72,
            "code": "#ff7f50",
            "spread": 0
          },
          {
            "colorid": 147,
            "gradientid": 72,
            "code": "#1e90ff",
            "spread": 100
          }
        ]
      }
    }
  }

const MyDocument = () => {
    return (
        <Document>
            <Page style={{ backgroundColor: `${backgrounds.front.type === 'solid' ? `${backgrounds.front.bgcolor}`  : 'trasparent' }`, position: 'relative' }} size={{ width: 252, height: 144 }}>
                <View style={{ width: "100%", height: "100%", position: "relative" }}>
                    <Text style={styles.watermark}>NFCCARDS.IN</Text>
                    {
                        data.map((item, index) => {
                            if (item.nodetype === 'text' && item.cardside === 'front') {
                                return <Text key={index} style={{ width: item.width * (252 / 1050), top: item.y * (252 / 1050), left: item.x * (252 / 1050), position: 'absolute', color: item.styles.color, fontSize: item.styles.fsize * (252 / 1050), fontWeight: item.styles.fweight, lineHeight: item.styles.lheight * (252 / 1050), letterSpacing: item.styles.lspacing * (252 / 1050), fontStyle: item.styles.fstyle, textDecoration: item.styles.tdecoration, textAlign: item.styles.talign, fontFamily: item.styles.ffamily }}>{item.text}</Text>
                            } else if (item.nodetype === "magictext" && item.cardside === 'front') {
                                if (item.type === "icon-text") {
                                    return (
                                        <View style={{ position: 'absolute', top: item.y * (252 / 1050), left: item.x * (252 / 1050), minWidth: 140 * (252 / 1050) }} key={index}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                                <View style={{ width: item.icon.width * (252 / 1050), height: item.icon.height * (252 / 1050), alignItems: 'center', justifyContent: 'center', position: "relative", top: -10 }}>
                                                    <Svg fill={item.icon.fill} width={8.4} height={8.4} viewBox={item.icon.viewbox}>
                                                        <Path d={item.icon.path} strokeLinecap={item.icon.strokelinecap} strokeWidth={item.icon.strokewidth} stroke={item.icon.stroke} fill={item.icon.pathfill} fillRule={item.icon.pathfillrule} strokeLinejoin={item.icon.strokelinejoin}/>
                                                    </Svg>
                                                </View>
                                                <Text style={{ paddingLeft: 10 * (252 / 1050), fontSize: item.styles.fsize * (252 / 1050), fontWeight: item.styles.fweight, lineHeight: item.styles.lheight * (252 / 1050), color: item.styles.color, letterSpacing: item.styles.lspacing * (252 / 1050), fontStyle: item.styles.fstyle, textDecoration: item.styles.tdecoration, fontFamily: item.styles.ffamily }}>{item.text}</Text>
                                            </View>
                                        </View>
                                    )
                                } else if (item.type === "logo-text") {
                                    return (
                                        <View style={{ position: 'absolute', top: item.y * (252 / 1050), left: item.x * (252 / 1050), flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 * (252 / 1050) }} key={index}>
                                            <Image src={`${baseurl}${item.image}`} style={{  width: item.width * (252 / 1050), height: item.height * (252 / 1050) }}/>
                                            <Text style={{ fontSize: item.styles.fsize * (252 / 1050), fontWeight: item.styles.fweight, lineHeight: item.styles.lheight * (252 / 1050), color: item.styles.color, letterSpacing: item.styles.lspacing * (252 / 1050), fontStyle: item.styles.fstyle, textDecoration: item.styles.tdecoration, fontFamily: item.styles.ffamily }}>{item.text}</Text>
                                        </View>
                                    )
                                }
                            } else if (item.nodetype === 'image' && item.cardside === 'front') {
                                return (
                                    <View style={{ position: 'absolute', top: item.y * (252 / 1050), left: item.x * (252 / 1050) }} key={index}>
                                        <Image src={`${baseurl}${item.image}`} style={{ width: item.width * (252 / 1050), height: item.height * (252 / 1050), zIndex: -1 }}/>
                                    </View>
                                )
                            }
                        })
                    }
                </View>
            </Page>
            <Page style={styles.bg} size={{ width: 252, height: 144 }}>
                <View style={{ width: "100%", height: "100%", position: "relative" }}>
                    <Text style={styles.watermark}>NFCCARDS.IN</Text>
                    {
                        data.map((item, index) => {
                            if (item.nodetype === 'text' && item.cardside === 'back') {
                                return <Text key={index} style={{ width: item.width * (252 / 1050), top: item.y * (252 / 1050), left: item.x * (252 / 1050), position: 'absolute', color: item.styles.color, fontSize: item.styles.fsize * (252 / 1050), fontWeight: item.styles.fweight, lineHeight: item.styles.lheight * (252 / 1050), letterSpacing: item.styles.lspacing * (252 / 1050), fontStyle: item.styles.fstyle, textDecoration: item.styles.tdecoration, textAlign: item.styles.talign, fontFamily: item.styles.ffamily }}>{item.text}</Text>
                            } else if (item.nodetype === "magictext" && item.cardside === 'back') {
                                if (item.type === "icon-text") {
                                    return (
                                        <View style={{ position: 'absolute', top: item.y * (252 / 1050), left: item.x * (252 / 1050), minWidth: 140 * (252 / 1050) }} key={index}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                                <View style={{ width: item.icon.width * (252 / 1050), height: item.icon.height * (252 / 1050), alignItems: 'center', justifyContent: 'center', position: "relative", top: -10 }}>
                                                    <Svg fill={item.icon.fill} width={8.4} height={8.4} viewBox={item.icon.viewbox}>
                                                        <Path d={item.icon.path} strokeLinecap={item.icon.strokelinecap} strokeWidth={item.icon.strokewidth} stroke={item.icon.stroke} fill={item.icon.pathfill} fillRule={item.icon.pathfillrule}/>
                                                    </Svg>
                                                </View>
                                                <Text style={{ paddingLeft: 10 * (252 / 1050), fontSize: item.styles.fsize * (252 / 1050), fontWeight: item.styles.fweight, lineHeight: item.styles.lheight * (252 / 1050), color: item.styles.color, letterSpacing: item.styles.lspacing * (252 / 1050), fontStyle: item.styles.fstyle, textDecoration: item.styles.tdecoration, fontFamily: item.styles.ffamily }}>{item.text}</Text>
                                            </View>
                                        </View>
                                    )
                                } else if (item.type === "logo-text") {
                                    return (
                                        <View style={{ position: 'absolute', top: item.y * (252 / 1050), left: item.x * (252 / 1050), flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 * (252 / 1050) }} key={index}>
                                            <Image src={`${baseurl}${item.image}`} style={{  width: item.width * (252 / 1050), height: item.height * (252 / 1050) }}/>
                                            <Text style={{ fontSize: item.styles.fsize * (252 / 1050), fontWeight: item.styles.fweight, lineHeight: item.styles.lheight * (252 / 1050), color: item.styles.color, letterSpacing: item.styles.lspacing * (252 / 1050), fontStyle: item.styles.fstyle, textDecoration: item.styles.tdecoration, fontFamily: item.styles.ffamily }}>{item.text}</Text>
                                        </View>
                                    )
                                }
                            } else if (item.nodetype === 'image' && item.cardside === 'back') {
                                return (
                                    <View style={{ position: 'absolute', top: item.y * (252 / 1050), left: item.x * (252 / 1050) }} key={index}>
                                        <Image src={`${baseurl}${item.image}`} style={{ width: item.width * (252 / 1050), height: item.height * (252 / 1050), zIndex: -1 }}/>
                                    </View>
                                )
                            }
                        })
                    }
                </View>
            </Page>
        </Document>
    );
};

export default MyDocument;