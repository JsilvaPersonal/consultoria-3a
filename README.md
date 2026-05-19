# Consultoria 3A — App de Acompanhamento

App PWA de acompanhamento para alunas da Consultoria Individual 3A.

## Estrutura de arquivos

```
app3a/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   └── MiniChart.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── DailyScreen.js
│   │   ├── CheckinScreen.js
│   │   └── ProgressScreen.js
│   ├── App.js
│   ├── data.js
│   ├── index.js
│   └── styles.css
├── vercel.json
└── package.json
```

## Como publicar no Vercel (passo a passo)

### Passo 1 — Criar conta no GitHub
1. Acesse github.com
2. Clique em "Sign up"
3. Crie sua conta gratuita

### Passo 2 — Criar repositório no GitHub
1. Clique no botão "+" no canto superior direito
2. Selecione "New repository"
3. Nome: consultoria-3a
4. Deixe como "Public"
5. Clique em "Create repository"

### Passo 3 — Fazer upload dos arquivos
1. Na página do repositório criado, clique em "uploading an existing file"
2. Arraste toda a pasta app3a para a área de upload
3. Clique em "Commit changes"

### Passo 4 — Criar conta no Vercel
1. Acesse vercel.com
2. Clique em "Sign up"
3. Escolha "Continue with GitHub" — conecta direto com sua conta do GitHub

### Passo 5 — Publicar o app
1. No painel do Vercel, clique em "Add New Project"
2. Selecione o repositório "consultoria-3a"
3. Clique em "Deploy"
4. Aguarde 2 a 3 minutos
5. Pronto — você receberá uma URL como: consultoria-3a.vercel.app

### Passo 6 — Instalar como app no celular (PWA)
iPhone:
1. Abra a URL no Safari
2. Toque no botão de compartilhar (quadrado com seta)
3. Selecione "Adicionar à Tela de Início"
4. Confirme — o app aparece como ícone na tela inicial

Android:
1. Abra a URL no Chrome
2. Toque nos três pontos no canto superior direito
3. Selecione "Adicionar à tela inicial"
4. Confirme

## Como enviar o acesso para a aluna

Mensagem modelo para WhatsApp:

"[Nome], seu acesso ao app de acompanhamento está pronto!

Acesse pelo link: [SUA URL AQUI]

No iPhone: abra no Safari → compartilhar → Adicionar à Tela de Início
No Android: abra no Chrome → menu → Adicionar à tela inicial

O app vai aparecer como um ícone no seu celular igual a um app normal.

Qualquer dúvida me chama!"

## Personalização futura

Para personalizar cores, nome da aluna ou textos, edite os arquivos em src/ e faça commit no GitHub. O Vercel publica automaticamente a nova versão em menos de 2 minutos.

## Próximos passos (segunda versão)

Para ter login individual por aluna e painel administrativo:
1. Criar conta gratuita no supabase.com
2. Contratar desenvolvedor para integrar autenticação
3. Cada aluna terá seu próprio login e histórico salvo
