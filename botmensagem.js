
function sendOpcoes(bot,chatid){
    const dataAtatual = new Date();
  //k tem que ser minusculo
    const replymarkInicio = {
        inline_keyboard: [
            [
              { text: '💣 Receba Notificação', callback_data: 'op_confirmar' },
              { text: '🔥 Saiba Mais', url: 'www.google.com' },
            ],
            [
              { text: '😻 Adiquira', url: 'www.google.com'},
            ],
        ],
    }

    const replymarkInicio2 = {
      inline_keyboard: [
        [
          { text: '💣 Receba Notificação', callback_data: 'op_confirmar' },
          { text: '🔥 Saiba Mais', url: 'www.google.com' },
        ],
        [
          { text: '😻 Adiquira', url: 'www.google.com'},
        ],
      ],
    }
const captionMensagem = `<b> Seja bem vindo ao programa emagreça rapido</b>
Aqui você recebera todas as informações. Data: ${dataAtatual.toLocaleString()}
`;

const imagepath = './img/dieta.jpg';


const optionMensagem ={
  caption: captionMensagem,
  parse_mode: 'HTML', // Indica que estamos usando HTML para formatar o caption
  reply_markup: replymarkInicio
}

bot.sendPhoto(chatid,imagepath,optionMensagem).catch((error) => {
    console.log(error)
})
}


function sendReceita(bot,chatid){
  const dataAtatual = new Date();
//k tem que ser minusculo

//pega do banco de dados
const captionMensagem = `<b> Cafe da manha: Bolo de chocolate com achocolatado. Data: ${dataAtatual.toLocaleString()} </b>
<b>Almoço: Docinho de coco com baunilha e sorverte</b>
<b>Janta: Macarronada com almondegas</b>
`;

const imagepath = './img/dieta.jpg';


const optionMensagem ={
caption: captionMensagem,
parse_mode: 'HTML', // Indica que estamos usando HTML para formatar o caption
}

bot.sendPhoto(chatid,imagepath,optionMensagem).catch((error) => {
  console.log(error)
})
}

function isValidEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}


function sendEmail(bot,chatid){
  const replyMarkup = {
    force_reply:true, //isso vai forçar a messagem ser um reply_message agente vai ver mais para frente isso
  }
  bot.sendMessage(chatid,'Digite seu email',{reply_markup:replyMarkup});///Manda mensagem para o bot

}



function handleStart(bot,text){
    bot.onText(new RegExp(text),async (msg) =>{
        const chatId = msg.chat.id;
         sendOpcoes(bot,chatId);
        
    });
}

function myTask(bot,chatid){
  sendReceita(bot,chatid)
}

module.exports ={handleStart,sendEmail,isValidEmail,myTask}