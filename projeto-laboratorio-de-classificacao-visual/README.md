# 😶‍🌫️ SentimentAI: Reconhecimento de Emoções por Visão Computacional

![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)
![Teachable Machine](https://img.shields.io/badge/Teachable_Machine-4285F4?style=for-the-badge&logo=google&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Machine Learning](https://img.shields.io/badge/Machine_Learning-FF6F00?style=for-the-badge&logo=pytorch&logoColor=white)

![Status](https://img.shields.io/badge/Status-Produção-brightgreen?style=flat-square)
![Versão TM](https://img.shields.io/badge/Teachable_Machine-v2.4.14-blue?style=flat-square)
![Versão TFJS](https://img.shields.io/badge/TensorFlow.js-v1.7.4-orange?style=flat-square)
![Classes](https://img.shields.io/badge/Classes-5_Emoções-purple?style=flat-square)
![Resolução](https://img.shields.io/badge/Resolução-224×224px-lightgrey?style=flat-square)

---

## 📝 Descrição do Projeto

O **SentimentAI** é um modelo de classificação de imagens treinado para o reconhecimento automático de **expressões faciais e emoções humanas** em tempo real. Desenvolvido com o framework **Google Teachable Machine** e exportado no formato **TensorFlow.js**, o modelo é capaz de identificar cinco estados emocionais distintos diretamente no navegador — sem necessidade de infraestrutura de backend ou processamento em nuvem.

A arquitetura combina a robustez de redes neurais convolucionais com a leveza do TensorFlow.js, permitindo inferência de baixa latência em dispositivos com recursos limitados. O pipeline completo, desde a captura de imagem até a predição classificada, opera inteiramente no lado do cliente, garantindo **privacidade de dados** e **responsividade**.

---

## 🎭 Classes do Modelo

O modelo foi treinado para reconhecer as seguintes expressões/emoções:

| Rótulo | Emoção | Descrição |
|---|---|---|
| `Raiva` | 😠 Raiva | Expressão de irritação, frustração ou hostilidade |
| `Medo` | 😨 Medo | Expressão de receio, susto ou apreensão |
| `Felicidade` | 😊 Felicidade | Expressão de alegria, contentamento ou satisfação |
| `Tristeza` | 😢 Tristeza | Expressão de melancolia, desânimo ou pesar |
| `Surpresa` | 😲 Surpresa | Expressão de espanto, admiração ou choque |

---

## 🚀 Tecnologias Utilizadas

- **Motor de Inferência:** TensorFlow.js v1.7.4 (Execução em-navegador via WebGL)
- **Framework de Treinamento:** Google Teachable Machine v2.4.14
- **Pacote de Imagem:** `@teachablemachine/image` v0.8.4-alpha2
- **Formato do Modelo:** TFJS Graph Model (arquivos `model.json` + `weights.bin`)
- **Resolução de Entrada:** 224 × 224 pixels (padrão MobileNet)

---

## 📁 Estrutura de Arquivos do Modelo

```
sentimentai-model/
├── model.json        # Grafo computacional e configuração da arquitetura
├── weights.bin       # Pesos sinápticos treinados (binário otimizado)
└── metadata.json     # Metadados do projeto: classes, versões e timestamp
```

### Detalhes dos Artefatos

| Arquivo | Descrição |
|---|---|
| `model.json` | Define a topologia da rede neural e referencia os shards de pesos |
| `weights.bin` | Arquivo binário contendo todos os pesos e biases do modelo treinado |
| `metadata.json` | Contém os rótulos das classes, versões do framework e configurações de entrada |

---

## 🔧 Como Utilizar

### Instalação via CDN (HTML puro)

```html
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.7.4/dist/tf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js"></script>
```

### Carregamento e Inferência

```javascript
const URL = "./sentimentai-model/";

async function init() {
  const modelURL  = URL + "model.json";
  const metaURL   = URL + "metadata.json";

  // Carrega o modelo treinado
  const model = await tmImage.load(modelURL, metaURL);

  // Realiza predição em um elemento de imagem/vídeo
  const predictions = await model.predict(imageElement);

  // Exibe os resultados
  predictions.forEach(p => {
    console.log(`${p.className}: ${(p.probability * 100).toFixed(2)}%`);
  });
}
```

### Instalação via npm

```bash
npm install @teachablemachine/image
```

```javascript
import * as tmImage from "@teachablemachine/image";

const model = await tmImage.load("./model.json", "./metadata.json");
const predictions = await model.predict(webcamElement);
```

---

## 📊 Especificações Técnicas

| Parâmetro | Valor |
|---|---|
| Nome do Modelo | Sentimentos |
| Número de Classes | 5 |
| Resolução de Entrada | 224 × 224 px |
| Framework Base | TensorFlow.js |
| Versão TF.js | 1.7.4 |
| Versão Teachable Machine | 2.4.14 |
| Pacote | `@teachablemachine/image` v0.8.4-alpha2 |
| Data de Exportação | 12 de Maio de 2026 |
| Execução | Client-side (sem servidor) |

---

## 💡 Casos de Uso

- **Acessibilidade:** Interfaces adaptativas que respondem ao estado emocional do usuário
- **EdTech:** Monitoramento de engajamento em plataformas de ensino online
- **UX Research:** Coleta de feedback emocional durante testes de usabilidade
- **Entretenimento:** Jogos e experiências interativas baseadas em emoção
- **Saúde Mental:** Suporte a ferramentas de autorregulação emocional

---

## ⚠️ Considerações Éticas

> Este modelo foi desenvolvido com fins educacionais e de pesquisa. O uso em ambientes de produção deve seguir as diretrizes de privacidade vigentes (LGPD/GDPR). **Nenhum dado facial é transmitido ou armazenado** — toda inferência ocorre localmente no dispositivo do usuário.

---

## 📄 Licença

Distribuído sob a licença **MIT**. Consulte o arquivo `LICENSE` para mais informações.

---

[⬆ Voltar ao início](https://github.com/profdiegocarvalho/portfolio-arthur-correia-carvalho)
