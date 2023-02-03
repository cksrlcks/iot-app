import { rest } from 'msw';
import trackingList from './data/trackingList';
import detail from './data/detail';
import eventTotal from './data/eventTotal';
import eventData from './data/eventItem';
import pathData from './data/path';
import pathDataSmall from './data/pathSmall';
import noticeData from './data/notice';
import logData from './data/driveLog';
import terminalList from './data/terminal';
import regionList from './data/region';
import pushSettingList from './data/pushSetting';
import pushList from './data/push';
import popupData from './data/popup';

export const handlers = [
    //login
    rest.post('/api/login', async (req, res, ctx) => {
        const userData = await req.json();
        return res(
            ctx.status(200),
            ctx.json({
                ...userData,
                userName: '홍길동',
            })
        );
    }),

    //user
    rest.get('/api/user', async (req, res, ctx) => {
        const { searchParams } = req.url;
        const userId = searchParams.get('id');

        return res(
            ctx.status(200),
            ctx.json({
                userId: userId,
                userName: '홍길동',
                companyCode: '유시스',
                password: 'wfwef29u0',
                phone: '01075613213',
                email: 'kck@uxis.co.kr',
                refreshPeriod: 30,
            })
        );
    }),

    //Tracking list (all)
    rest.get('/api/tracking', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                totalEventCount: eventTotal.length,
                lists: trackingList,
            })
        );
    }),

    //Item detail
    rest.get('/api/detail', (req, res, ctx) => {
        const { searchParams } = req.url;
        const itemId = searchParams.get('id');
        const itemName = searchParams.get('name');
        return res(ctx.status(200), ctx.delay(500), ctx.json({ ...detail, unitnm: itemName }));
    }),

    //Item Path Detail Data (페이징처리)
    rest.get('/api/pathDetail', (req, res, ctx) => {
        const { searchParams } = req.url;
        const itemId = searchParams.get('id');
        const test = searchParams.get('test');

        if (!test) {
            const size = Number(searchParams.get('size'));
            const page = Number(searchParams.get('page'));
            const totalCount = pathData.length;
            const totalPages = Math.round(totalCount / size);

            return res(
                ctx.status(200),
                ctx.delay(500),
                ctx.json({
                    lists: pathData.slice(page * size, (page + 1) * size),
                    pageNumber: page,
                    pageSize: size,
                    totalPages,
                    totalCount,
                    isLastPage: totalPages <= page,
                    isFirstPage: page === 0,
                })
            );
        } else {
            const size = Number(searchParams.get('size'));
            const page = Number(searchParams.get('page'));
            const totalCount = pathDataSmall.length;
            const totalPages = Math.round(totalCount / size);

            const lists = pathDataSmall
                .slice(page * size, (page + 1) * size)
                .map((item) => ({ ...item, unitid: itemId }));
            return res(
                ctx.status(200),
                ctx.delay(500),
                ctx.json({
                    lists: lists,
                    pageNumber: page,
                    pageSize: size,
                    totalPages,
                    totalCount,
                    isLastPage: totalPages <= page,
                    isFirstPage: page === 0,
                })
            );
        }
    }),

    //Item Path Coords Data (좌표만 전부 보내주기)
    rest.get('/api/pathCoords', (req, res, ctx) => {
        const { searchParams } = req.url;
        const itemId = searchParams.get('id');
        const test = searchParams.get('test');
        if (!test) {
            return res(
                ctx.status(200),
                ctx.json(
                    pathData.map((item) => ({
                        idx: item.idx,
                        length: item.length,
                        latitude: item.latitude,
                        longitude: item.longitude,
                    }))
                )
            );
        } else {
            return res(
                ctx.status(200),
                ctx.json(
                    pathDataSmall.map((item) => ({
                        idx: item.idx,
                        length: item.length,
                        latitude: item.latitude,
                        longitude: item.longitude,
                    }))
                )
            );
        }
    }),

    //Seletced Path Marker Detail
    rest.get('/api/pathOneItem', (req, res, ctx) => {
        const { searchParams } = req.url;
        const itemId = searchParams.get('id');
        const pathIdx = searchParams.get('idx');
        const test = searchParams.get('test');
        if (!test) {
            return res(
                ctx.status(200),
                ctx.json(pathData.filter((item) => item.idx === Number(pathIdx))[0])
            );
        } else {
            return res(
                ctx.status(200),
                ctx.json(pathDataSmall.filter((item) => item.idx === Number(pathIdx))[0])
            );
        }
    }),

    //운행일지에서 위치관제 넘어올때
    rest.get('/api/pathByLog', (req, res, ctx) => {
        const { searchParams } = req.url;
        const itemId = searchParams.get('id');

        const selectItem = trackingList.filter((item) => item.unitid === itemId)[0];
        const pathData = pathDataSmall;

        return res(ctx.status(200), ctx.json({ selectItem, pathData }));
    }),

    //Total Event list (all)
    rest.get('/api/event', (req, res, ctx) => {
        const { searchParams } = req.url;
        const itemId = searchParams.get('id');
        if (itemId) {
            const size = Number(searchParams.get('size'));
            const page = Number(searchParams.get('page'));
            const totalCount = eventData.length;
            const totalPages = Math.round(totalCount / size);

            return res(
                ctx.status(200),
                ctx.delay(500),
                ctx.json({
                    lists: eventData.slice(page * size, (page + 1) * size),
                    pageNumber: page,
                    pageSize: size,
                    totalPages,
                    totalCount,
                    isLastPage: totalPages <= page,
                    isFirstPage: page === 0,
                })
            );
        } else {
            const size = Number(searchParams.get('size'));
            const page = Number(searchParams.get('page'));
            const totalCount = eventTotal.length;
            const totalPages = Math.round(totalCount / size);

            return res(
                ctx.status(200),
                ctx.delay(500),
                ctx.json({
                    lists: eventTotal.slice(page * size, (page + 1) * size),
                    pageNumber: page,
                    pageSize: size,
                    totalPages,
                    totalCount,
                    isLastPage: totalPages <= page,
                    isFirstPage: page === 0,
                })
            );
        }
    }),

    //최근 공지사항 & 이벤트
    rest.get('/api/recent', (req, res, ctx) => {
        const { searchParams } = req.url;
        const type = searchParams.get('type');
        let lists;
        if (type === 'event') {
            lists = eventData.slice(0, 4);
        } else if (type === 'notice') {
            lists = noticeData.slice(0, 4);
        }
        return res(ctx.status(200), ctx.json(lists));
    }),

    //공지사항
    rest.get('/api/notice', (req, res, ctx) => {
        const { searchParams } = req.url;
        const id = searchParams.get('id');
        if (id) {
            return res(ctx.status(200), ctx.json(noticeData.filter((item) => item.id === id)[0]));
        } else {
            return res(ctx.status(200), ctx.delay(500), ctx.json(noticeData));
        }
    }),

    //중요공지
    rest.get('/api/urgent', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(noticeData.filter((item) => item.urgent === true)[0]));
    }),

    //운행일지
    rest.get('/api/log/list', (req, res, ctx) => {
        const data = logData.map((item) => {
            return { idx: item.idx, unitid: item.unitid, unit_nm: item.unit_nm };
        });
        return res(ctx.status(200), ctx.delay(500), ctx.json({ lists: data }));
    }),

    rest.get('/api/log', (req, res, ctx) => {
        const { searchParams } = req.url;
        const itemId = searchParams.get('id');
        if (itemId) {
            const targetData = logData.filter((item) => item.unitid === itemId);
            const totalCount = targetData.length;

            return res(
                ctx.status(200),
                ctx.delay(500),
                ctx.json({
                    lists: targetData,
                    totalCount,
                })
            );
        } else {
            const totalCount = logData.length;
            return res(ctx.status(200), ctx.delay(500), ctx.json({ lists: logData, totalCount }));
        }
    }),

    //단말목록
    rest.get('/api/terminal', (req, res, ctx) => {
        const { searchParams } = req.url;
        const itemId = searchParams.get('id');
        const mode = searchParams.get('mode');
        if (mode) {
            return res(ctx.status(200), ctx.delay(500), ctx.json({ lists: terminalList }));
        }
        if (itemId) {
            const data = terminalList.filter((item) => item.unitid === itemId)[0];
            return res(ctx.status(200), ctx.json(data));
        } else {
            return res(ctx.status(200), ctx.delay(500), ctx.json({ lists: terminalList }));
        }
    }),

    //진입이탈
    rest.get('/api/region', (req, res, ctx) => {
        const { searchParams } = req.url;
        const itemId = searchParams.get('id');
        const connect = searchParams.get('connect');

        if (itemId || connect) {
            const num = connect ? connect : itemId;
            const data = regionList.filter((item) => item.id === Number(num))[0];
            return res(ctx.status(200), ctx.json(data));
        } else {
            return res(ctx.status(200), ctx.delay(500), ctx.json({ lists: regionList }));
        }
    }),

    rest.get('/api/message', (req, res, ctx) => {
        const { searchParams } = req.url;
        const type = searchParams.get('type');
        const id = searchParams.get('id');
        if (type) {
            const data = pushList.filter((item) => item.method == type);
            return res(ctx.status(200), ctx.delay(500), ctx.json(data));
        }
        if (id) {
            const data = pushSettingList.filter((item) => item.userId === id)[0];
            return res(ctx.status(200), ctx.delay(500), ctx.json(data));
        }
        return res(ctx.status(200), ctx.delay(500), ctx.json(pushSettingList));
    }),

    //팝업
    rest.get('/api/popup', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(popupData));
    }),
];
