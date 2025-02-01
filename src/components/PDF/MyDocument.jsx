import { Document, Font, Image, Page, Path, Svg, Text, View } from "@react-pdf/renderer";
import { baseurl } from "../../config/apiUrl";

import OpenRegular from './OpenSans-Regular.ttf';
import OpenRegularItalic from './OpenSans-Italic.ttf';
import OpenBold from './OpenSans-Bold.ttf';
import OpenBoldItalic from './OpenSans-BoldItalic.ttf';

import interRegular from './Inter_18pt-Regular.ttf';
import interRegularItalic from './Inter_18pt-italic.ttf';
import interBold from './Inter_18pt-Bold.ttf';
import interBoldItalic from './Inter_18pt-BoldItalic.ttf';

import poppinsRegular from './Inter_18pt-Regular.ttf';
import poppinsRegularItalic from './Inter_18pt-italic.ttf';
import poppinsBold from './Inter_18pt-Bold.ttf';
import poppinsBoldItalic from './Inter_18pt-BoldItalic.ttf';

import robotoRegular from './Inter_18pt-Regular.ttf';
import robotoRegularItalic from './Inter_18pt-italic.ttf';
import robotoBold from './Inter_18pt-Bold.ttf';
import robotoBoldItalic from './Inter_18pt-BoldItalic.ttf';

import italianno from './Italianno-Regular.ttf';

Font.register({
    family: 'Italianno',
    src: italianno,
    fontWeight: 'normal',
    fontStyle: 'normal'
});

Font.register({
    family: 'Roboto',
    src: robotoRegular,
    fontWeight: 'normal',
    fontStyle: 'normal'
});
Font.register({
    family: 'Roboto',
    src: robotoRegularItalic,
    fontWeight: 'normal',
    fontStyle: 'italic'
});
Font.register({
    family: 'Roboto',
    src: robotoBold,
    fontWeight: '700',
    fontStyle: 'normal'
});
Font.register({
    family: 'Roboto',
    src: robotoBoldItalic,
    fontWeight: '700',
    fontStyle: 'italic'
});

Font.register({
    family: 'Poppins',
    src: poppinsRegular,
    fontWeight: 'normal',
    fontStyle: 'normal'
});
Font.register({
    family: 'Poppins',
    src: poppinsRegularItalic,
    fontWeight: 'normal',
    fontStyle: 'italic'
});
Font.register({
    family: 'Poppins',
    src: poppinsBold,
    fontWeight: '700',
    fontStyle: 'normal'
});
Font.register({
    family: 'Poppins',
    src: poppinsBoldItalic,
    fontWeight: '700',
    fontStyle: 'italic'
});

Font.register({
    family: 'Open Sans',
    src: OpenRegular,
    fontWeight: 'normal',
    fontStyle: 'normal'
});
Font.register({
    family: 'Open Sans',
    src: OpenRegularItalic,
    fontWeight: 'normal',
    fontStyle: 'italic'
});
Font.register({
    family: 'Open Sans',
    src: OpenBold,
    fontWeight: '700',
    fontStyle: 'normal'
});
Font.register({
    family: 'Open Sans',
    src: OpenBoldItalic,
    fontWeight: '700',
    fontStyle: 'italic'
});

Font.register({
    family: 'Inter',
    src: interRegular,
    fontWeight: 'normal',
    fontStyle: 'normal'
});
Font.register({
    family: 'Inter',
    src: interRegularItalic,
    fontWeight: 'normal',
    fontStyle: 'italic'
});
Font.register({
    family: 'Inter',
    src: interBold,
    fontWeight: '700',
    fontStyle: 'normal'
});
Font.register({
    family: 'Inter',
    src: interBoldItalic,
    fontWeight: '700',
    fontStyle: 'italic'
});

const MyDocument = ({ data, backgrounds }) => {
    return (
        <Document>
            <Page style={{ backgroundColor: `${backgrounds.front.type === 'solid' ? `${backgrounds.front.bgcolor}`  : 'trasparent' }`, position: 'relative' }} size={{ width: 252, height: 144 }}>
                <View style={{ width: "100%", height: "100%", position: "relative" }}>
                    {
                        data.map((item, index) => {
                            if (item.nodetype === 'text' && item.cardside === 'front') {
                                return <Text key={index} style={{ width: item.width * (252 / 1050), top: item.y * (252 / 1050), left: item.x * (252 / 1050), position: 'absolute', color: item.styles.color, fontSize: item.styles.fsize * (252 / 1050), fontWeight: item.styles.fweight, letterSpacing: item.styles.lspacing * (252 / 1050), fontStyle: item.styles.fstyle, textDecoration: item.styles.tdecoration, textAlign: item.styles.talign, fontFamily: item.styles.ffamily }}>{item.text}</Text>
                            } else if (item.nodetype === "magictext" && item.cardside === 'front') {
                                if (item.type === "icon-text") {
                                    const svgProps = Object.fromEntries(Object.entries({
                                        viewBox: item.icon.viewbox,
                                        fill: item.icon.fill
                                    }).filter(([_, value]) => value !== null && value !== undefined && value !== ""));
                                    return (
                                        <View style={{ position: 'absolute', top: item.y * (252 / 1050), left: item.x * (252 / 1050), minWidth: 140 * (252 / 1050), paddingTop: 12 * (252 / 1050), paddingBottom: 12 * (252 / 1050), width: item.width * (252 / 1050) }} key={index}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                                <View style={{ width: item.icon.width * (252 / 1050), height: item.icon.height * (252 / 1050), alignItems: 'center', justifyContent: 'center' }}>
                                                    <Svg width={8.4} height={8.4} {...svgProps}>
                                                        {
                                                            item.icon.paths.map((path, pathIndex) => {
                                                                const pathProps = Object.fromEntries(
                                                                    Object.entries({
                                                                    d: path.d,
                                                                    strokeLinecap: path.strokelinecap,
                                                                    strokeWidth: path.strokewidth,
                                                                    stroke: path.stroke,
                                                                    fill: path.pathfill,
                                                                    fillRule: path.pathfillrule,
                                                                    strokeLinejoin: path.strokelinejoin,
                                                                    }).filter(([_, value]) => value !== null && value !== undefined && value !== "")
                                                                );
                                                                return (
                                                                    <Path key={pathIndex} {...pathProps}/>
                                                                )
                                                            })
                                                        }
                                                    </Svg>
                                                </View>
                                                <Text style={{ paddingLeft: 10 * (252 / 1050), fontSize: item.styles.fsize * (252 / 1050), fontWeight: item.styles.fweight, color: item.styles.color, letterSpacing: item.styles.lspacing * (252 / 1050), fontStyle: item.styles.fstyle, textDecoration: item.styles.tdecoration, fontFamily: item.styles.ffamily }}>{item.text}</Text>
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
                            } else if (item.nodetype === 'image' && item.cardside === 'front' && item.filetype !== 'svg') {
                                return (
                                    <View style={{ position: 'absolute', top: item.y * (252 / 1050), left: item.x * (252 / 1050) }} key={index}>
                                        <Image src={`${baseurl}${item.image}`} style={{ width: item.width * (252 / 1050), height: item.height * (252 / 1050) }}/>
                                    </View>
                                )
                            } else if (item.nodetype === "image" && item.cardside === 'front' && item.filetype === 'svg') {
                                return (
                                    <View style={{ position: 'absolute', top: item.y * (252 / 1050), left: item.x * (252 / 1050) }} key={index}>
                                        <Svg style={{ width: item.width, height: item.height }} width={item.width} height={item.height} viewBox={item.viewbox} fill={item.fill}>
                                            {
                                                item.paths.map((path, index) => {
                                                    return (
                                                        <Path d={path.d} strokeLinecap={path.strokelinecap} strokeWidth={path.strokewidth} stroke={path.stroke} fill={path.pathfill} fillRule={path.pathfillrule} strokeLinejoin={path.strokelinejoin} key={index}/>
                                                    )
                                                })
                                            }
                                        </Svg>
                                    </View>
                                )
                            } else if (item.nodetype === 'shape' && item.cardside === 'front') {
                                return (
                                    <View 
                                        key={index}
                                        style={{
                                            width: (item.width || 0) * (252 / 1050),
                                            height: (item.height || 0) * (252 / 1050),
                                            backgroundColor: item.styles.bgcolor || 'transparent',
                                            borderRadius: item.shapetype !== 'circle' 
                                                ? (item.styles.bradius || 0) * (252 / 1050) 
                                                : `${(item.styles.bradius || 0)}%`,
                                            borderWidth: (item.styles.bwidth || 0) * (252 / 1050),
                                            borderStyle: item.styles.bstyle || 'solid',
                                            borderColor: item.styles.bcolor || 'black',
                                            opacity: (item.styles.opacity ?? 100) / 100,
                                            position: 'absolute',
                                            top: (item.y || 0) * (144 / 600) - 1,
                                            left: (item.x || 0) * (252 / 1050)
                                        }}
                                    >
                                    </View>
                                )
                            }
                        })
                    }
                    <Text style={{ fontSize: 25, position: 'absolute', top: 55, left: 40, transform: 'rotate(-29deg)', fontFamily: "Inter", fontWeight: "700", color: '#000000', opacity: 0.1 }}>NFCCARDS.IN</Text>
                </View>
            </Page>
            <Page style={{ backgroundColor: `${backgrounds.back.type === 'solid' ? `${backgrounds.back.bgcolor}`  : 'trasparent' }`, position: 'relative' }} size={{ width: 252, height: 144 }}>
                <View style={{ width: "100%", height: "100%", position: "relative" }}>
                    {
                        data.map((item, index) => {
                            if (item.nodetype === 'text' && item.cardside === 'back') {
                                return <Text key={index} style={{ width: item.width * (252 / 1050), top: item.y * (252 / 1050), left: item.x * (252 / 1050), position: 'absolute', color: item.styles.color, fontSize: item.styles.fsize * (252 / 1050), fontWeight: item.styles.fweight, lineHeight: item.styles.lheight * (252 / 1050), letterSpacing: item.styles.lspacing * (252 / 1050), fontStyle: item.styles.fstyle, textDecoration: item.styles.tdecoration, textAlign: item.styles.talign, fontFamily: item.styles.ffamily }}>{item.text}</Text>
                            } else if (item.nodetype === "magictext" && item.cardside === 'back') {
                                if (item.type === "icon-text") {
                                    const svgProps = Object.fromEntries(Object.entries({
                                        viewBox: item.icon.viewbox,
                                        fill: item.icon.fill
                                    }).filter(([_, value]) => value !== null && value !== undefined && value !== ""));
                                    return (
                                        <View style={{ position: 'absolute', top: item.y * (252 / 1050), left: item.x * (252 / 1050), minWidth: 140 * (252 / 1050), paddingTop: 12 * (252 / 1050), paddingBottom: 12 * (252 / 1050), width: item.width * (252 / 1050) }} key={index}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                                <View style={{ width: item.icon.width * (252 / 1050), height: item.icon.height * (252 / 1050), alignItems: 'center', justifyContent: 'center' }}>
                                                    <Svg width={8.4} height={8.4} {...svgProps}>
                                                        {
                                                            item.icon.paths.map((path, pathIndex) => {
                                                                const pathProps = Object.fromEntries(
                                                                    Object.entries({
                                                                    d: path.d,
                                                                    strokeLinecap: path.strokelinecap,
                                                                    strokeWidth: path.strokewidth,
                                                                    stroke: path.stroke,
                                                                    fill: path.pathfill,
                                                                    fillRule: path.pathfillrule,
                                                                    strokeLinejoin: path.strokelinejoin,
                                                                    }).filter(([_, value]) => value !== null && value !== undefined && value !== "")
                                                                );
                                                                return (
                                                                    <Path key={pathIndex} {...pathProps}/>
                                                                )
                                                            })
                                                        }
                                                    </Svg>
                                                </View>
                                                <Text style={{ paddingLeft: 10 * (252 / 1050), fontSize: item.styles.fsize * (252 / 1050), fontWeight: item.styles.fweight, color: item.styles.color, letterSpacing: item.styles.lspacing * (252 / 1050), fontStyle: item.styles.fstyle, textDecoration: item.styles.tdecoration, fontFamily: item.styles.ffamily }}>{item.text}</Text>
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
                            } else if (item.nodetype === 'shape' && item.cardside === 'back') {
                                return (
                                    <View 
                                        key={index}
                                        style={{
                                            width: (item.width || 0) * (252 / 1050),
                                            height: (item.height || 0) * (252 / 1050),
                                            backgroundColor: item.styles.bgcolor || 'transparent',
                                            borderRadius: item.shapetype !== 'circle' 
                                                ? (item.styles.bradius || 0) * (252 / 1050) 
                                                : `${(item.styles.bradius || 0)}%`,
                                            borderWidth: (item.styles.bwidth || 0) * (252 / 1050),
                                            borderStyle: item.styles.bstyle || 'solid',
                                            borderColor: item.styles.bcolor || 'black',
                                            opacity: (item.styles.opacity ?? 100) / 100,
                                            position: 'absolute',
                                            top: (item.y || 0) * (144 / 600) - 1,
                                            left: (item.x || 0) * (252 / 1050)
                                        }}
                                    >
                                    </View>
                                )
                            }
                        })
                    }
                    <Text style={{ fontSize: 25, position: 'absolute', top: 55, left: 40, transform: 'rotate(-29deg)', fontFamily: "Inter", fontWeight: "700", color: '#000000', opacity: 0.1 }}>NFCCARDS.IN</Text>
                </View>
            </Page>
        </Document>
    );
};

export default MyDocument;