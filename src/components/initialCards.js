const karachaevsk = new URL('../images/karachaevsk.jpg',
    import.meta.url);
const elbrus = new URL('../images/elbrus.jpg',
    import.meta.url);
const dombai = new URL('../images/dombai.jpg',
    import.meta.url);
const kamchatka = new URL('../images/kamchatka.jpg',
    import.meta.url);
const osetia = new URL('../images/osetia.jpg',
    import.meta.url);
const sochi = new URL('../images/sochi.jpg',
    import.meta.url);


export const initialCards = [{
        name: 'Карачаевск',
        link: karachaevsk
    },
    {
        name: 'Гора Эльбрус',
        link: elbrus
    },
    {
        name: 'Домбай',
        link: dombai
    },
    {
        name: 'Камчатка',
        link: kamchatka
    },
    {
        name: 'Северная Осетия',
        link: osetia
    },
    {
        name: 'Сочи',
        link: sochi
    }
];