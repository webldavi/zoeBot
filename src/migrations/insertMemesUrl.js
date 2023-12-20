const db = require("../database");

const createServerTable = () => {
  return {
    up() {
      const memesUrls = [
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTo7bKomp-1j5cRHPcoXejzhnS_GDsZVu1jkg&usqp=CAU",
        },
        {
          url: "https://cdn.discordapp.com/attachments/537436830644174888/721399353578618980/Screenshot_20200413-1620352.png",
        },
        {
          url: "https://cdn.discordapp.com/attachments/537436830644174888/721397844908441731/FB_IMG_1592064998671.jpg",
        },
        {
          url: "https://cdn.discordapp.com/attachments/537436830644174888/721350098025709649/595a48cd2cf320d38de60c5cc2db229a.jpg",
        },
        {
          url: "https://cdn.discordapp.com/attachments/537436830644174888/721218441201057802/99010786_260583428723314_6443802143273335000_n.png",
        },
        {
          url: "https://cdn.discordapp.com/attachments/537436830644174888/720315545953632256/20200610_125350.jpg",
        },
        {
          url: "https://cdn.discordapp.com/attachments/537436830644174888/719969758757519420/Z.png",
        },
        {
          url: "https://cdn.discordapp.com/attachments/297732013006389252/696870075008942120/83578331_193367885107804_3974484421284724736_o.png",
        },
        {
          url: "https://cdn.discordapp.com/attachments/537436830644174888/714194135187193936/IMG-20200524-WA0029.jpg",
        },
        {
          url: "https://cdn.discordapp.com/attachments/537436830644174888/713817760068534282/IMG_20190423_031707.jpg",
        },
        {
          url: "https://cdn.discordapp.com/attachments/537436830644174888/713788900258349056/FB_IMG_1580744860515.jpg",
        },
        {
          url: "https://cdn.discordapp.com/attachments/537436830644174888/713400577501036624/Screenshot_20200522-113846.png",
        },
        {
          url: "https://cdn.discordapp.com/attachments/597121888472399912/711214110767054868/FB_IMG_1589337569956.png",
        },
        {
          url: "https://cdn.discordapp.com/attachments/537436830644174888/709947633783013466/FB_IMG_1577831919849.jpg",
        },
        {
          url: "https://cdn.discordapp.com/attachments/537436830644174888/709947633531093112/FB_IMG_1580410152556.jpg",
        },
        {
          url: "https://cdn.discordapp.com/attachments/537436830644174888/709947633170513992/IMG-20200314-WA0004.jpg",
        },
        {
          url: "https://cdn.discordapp.com/attachments/537436830644174888/709579532033720360/FB_IMG_15888940674391276.jpg",
        },
        {
          url: "https://cdn.discordapp.com/attachments/297732013006389252/709501450438574181/unknown.png",
        },
        {
          url: "https://cdn.discordapp.com/attachments/537436830644174888/708113990013681804/IMG-20200506-WA0013.jpg",
        },
        {
          url: "https://cdn.discordapp.com/attachments/537436830644174888/708113989745377332/IMG-20200506-WA0034.jpg",
        },
        {
          url: "https://cdn.discordapp.com/attachments/537436830644174888/708113989552439336/FB_IMG_1588813700994.jpg",
        },
        {
          url: "https://cdn.discordapp.com/attachments/537436830644174888/708113988965236756/FB_IMG_1588867563069.jpg",
        },
        {
          url: "https://cdn.discordapp.com/attachments/537436830644174888/708113857893105825/FB_IMG_1588897832157.jpg",
        },
        {
          url: "https://cdn.discordapp.com/attachments/537436830644174888/706276865945501718/EXCuBl-XYAcy0iM.png",
        },
        {
          url: "https://cdn.discordapp.com/attachments/680920566517334061/705430605067714670/IMG_20200414_224316.jpg",
        },
        {
          url: "https://cdn.discordapp.com/attachments/537436830644174888/705162921503752272/FB_IMG_1588194307864.jpg",
        },
        {
          url: "https://cdn.discordapp.com/attachments/537436830644174888/704860877450379324/55d219dd7fa833780433b0afbf721f21.jpg",
        },
        {
          url: "https://cdn.discordapp.com/attachments/297732013006389252/704467536405856366/IMG_20190903_131522.jpg",
        },
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR1LJMKjaa5RYPlJheNuZGnO5Hx4C1ZQlOoQg&usqp=CAU",
        },
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSikJtprG1gNxHz422-NxF5V6afNKJHkILRXg&usqp=CAU",
        },
        {
          url: "https://cdn.discordapp.com/attachments/537436830644174888/722515672327913482/Z.png",
        },
        {
          url: "https://media.discordapp.net/attachments/789903148973424660/1140638531778265098/unknown.png?width=383&height=473",
        },
      ];
      const query = `INSERT INTO tb_memes (url) VALUES(?)`;
      memesUrls.forEach(url=>{
        db.run(query, [url.url]);
      })
    },
    down() {
      const query = "DELETE FROM tb_memes WHERE url = ?";
      memesUrls.forEach(url=>{
        db.run(query, [url.url]);
      })
    },
  };
};

module.exports = createServerTable;
