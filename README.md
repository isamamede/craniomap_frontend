# Craniomap

[![Expo](https://img.shields.io/badge/Expo-Managed_Workflow-4CAF50)](https://expo.dev/) 
[![React Native](https://img.shields.io/badge/React_Native-0.71-blue)](https://reactnative.dev/) 
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue)](https://www.typescriptlang.org/)

**Craniomap** é um aplicativo mobile desenvolvido em **React Native com Expo**, voltado para coleta, análise e anotação de medidas faciais.  
O app integra TensorFlow e CompreFace para detecção de landmarks faciais, com persistência de dados local via **Realm**.

> ⚠️ Servidor de teste atual: `ec2-98-86-214-11.compute-1.amazonaws.com`  
> ⚠️ Observação: o servidor de teste **nem sempre está ativo**. Substituir pelo servidor de produção quando disponível.  

> ⚠️ Este projeto possui **patente em trânsito**. Uso não autorizado é proibido.

---

## 📌 Funcionalidades

- Registro de participantes  
- Captura e armazenamento de imagens faciais  
- Detecção de **landmarks faciais** via TensorFlow e CompreFace
- Armazenamento local de dados com **Realm**  
- Anotação de pontos e medidas faciais  
- Exportação de dados para análise posterior  

---

## 🛠 Tecnologias

- React Native (Expo Managed Workflow)  
- **Realm** (banco de dados local)  
- TensorFlow (landmark detection)  
- CompreFace (reconhecimento facial)  
- TypeScript  
- Expo

---

## 💻 Pré-requisitos

- Node.js >= 20.19.4  
- npm ou yarn  
- Expo CLI (`npm install -g expo-cli`)  
- Conta no **Expo** (para builds com EAS)  
- Para builds iOS: Apple Developer Account ($99/ano)  

---

## ⚡ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/isamamede/craniomap_frontend.git craniomap
cd craniomap
````

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Inicie o projeto no Expo (Android ou iOS):

```bash
npx expo start
```

---

## 📱 Build de aplicativos standalone

### **Android (APK)**

```bash
eas build --platform android
```

* Após a conclusão, você receberá um link para download do APK.
* O APK pode ser compartilhado diretamente e instalado em dispositivos Android.

### **iOS (IPA)**

```bash
eas build --platform ios
```

* Para iOS, é necessário um **Apple Developer Account**.
* Expo gerará o IPA e as credenciais automaticamente (ou você pode fornecer manualmente).
* O IPA pode ser compartilhado via **TestFlight** com testadores.

> ⚠️ Sem Apple Developer Account, não é possível compartilhar o IPA amplamente — só funciona em dispositivos registrados.

---

## 🔧 Estrutura do Projeto

```
/mobile
 ├─ /src
 │   ├─ /assets       # Imagens e ícones
 │   ├─ /components   # Componentes React
 │   ├─ /config       # Configuração de serviços utilizados
 │   ├─ /contexts     # Contexts React
 │   ├─ /constants    # Constantes
 │   ├─ /databases    # Schemas Realm
 │   ├─ /hooks        # Hooks React
 │   ├─ /routes       # Rotas para navegar entre telas
 │   ├─ /screens      # Telas do app
 │   └─ /utils        # Funções auxiliares
 ├─ App.tsx           # Arquivo principal
 ├─ app.json          # Configuração Expo
 └─ eas.json          # Configuração EAS Build
```

---

## 🔑 Permissões

O app solicita:

* Acesso à câmera
* Leitura e escrita de armazenamento
* Acesso à localização de mídia (EXIF)

---

## 🌐 Servidor

* Servidor de teste atual: `ec2-98-86-214-11.compute-1.amazonaws.com`
* ⚠️ O servidor de teste **nem sempre está ativo**.
* Substituir pelo servidor de produção quando disponível.

---

## 💾 Banco de Dados

* Persistência local de dados usando **Realm**.
* Estrutura de tabelas para participantes, imagens, pontos e medidas faciais.

---

## 📝 Observações Legais

* Este projeto possui **patente em trânsito**.
* Todo uso, distribuição, modificação ou cópia **não autorizado é proibido**.
* Somente colaboradores autorizados ou equipes internas podem acessar, modificar ou usar o código.

---

## 📝 Observações Técnicas

* Use **Node.js 20.x** para compatibilidade com EAS Build.
* Para builds iOS, é necessário **Apple Developer Account**.
* Para builds Android, o APK pode ser compartilhado sem custos entre membros do time.
