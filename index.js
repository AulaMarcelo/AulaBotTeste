const TelegramBot = require('node-telegram-bot-api');
const {bot} = require('./bot');
const {handleStart, sendEmail, isValidEmail, myTask} = require('./botmensagem');
const cron = require('node-cron');
var usuarios = [
    {
        nome:"Marcelo", 
        chatid:"",
        email:"marcelo@gmail.com"

    },
    {
        nome:"Pedro", 
        chatid:"",
        email:"pedro@gmail.com"

    },
]
handleStart(bot,'start');

bot.on('callback_query',(query)=>{
    const chatId = query.message.chat.id; //id do usuario, no caso que interage com o telegram
    const data = query.data; // e aqui pega os dados que ele digitou
   
    switch(data){
        case 'op_confirmar':
            //enviar uma opção para ele digitar o email.
            console.log(data)
            sendEmail(bot,chatId)/////Manda mensagem para o bot e agora tem que pegar com o bot.on('message')
    }
 
});

bot.on('message',(message)=>{
    const chatId = message.chat.id;
    console.log(message.reply_to_message)
    if(message.reply_to_message){
        // Verifica se a mensagem é uma resposta a um input
        if(message.reply_to_message.text === 'Digite seu email'){
             const userText = message.text;
             //verifica se email é valid
             if(isValidEmail(userText)){
                //aqui eu podeeria pegar do banco direto,  ou atravez de uma api para verificar o email do usuario esta´registardo.
                const usuario = usuarios.find(usuario => usuario.email === userText);
                //pegar o indice, de forma difrete
                const usuarioIndice = usuarios.findIndex(function(usuario){
                    return usuario.email === userText;
                })
                console.log(usuario)
                if(usuario && usuarioIndice !== -1){
                    console.log(usuario)
                    usuarios[usuarioIndice].chatid = chatId
                    console.log(JSON.stringify(usuarios,2,null))
                    bot.sendMessage(chatId,"Seja bem vindo você recebera diariamente sua receita e atualizações por meio deste")

                }else{
                    console.log('usuario nao existe')
                    bot.sendMessage(chatId, 'Você não possui o nosso produto adiquira já no link : http://www.google.com');
                }
             }else{
                bot.sendMessage(chatId, 'Email inválido. Por favor, digite um email válido.');
                sendEmail(bot,chatId)
             }
        }
    }
})

cron.schedule('* * * * *', () => {
    console.log('Rodando a task a cada dois minutos');
    usuarios.map(usuario =>{
        if(usuario.chatid != ""){
            myTask(bot,usuario.chatid)
        }else{
            //Aqui savla na tabele de log para ver os usuarios que  não estao cadastrado, comprou o curso mas não cdastrou no bot.
            console.log(usuario)
        }
    })
});