# Laboratório de Classificação Visual

Repositório criado para o projeto: Laboratório de Classificação Visual.

# Fundamentos de Inteligência Artificial: Análise de Viés e Mitigação

Este repositório contém uma análise crítica desenvolvida para a disciplina de **Fundamentos de Inteligência Artificial**, focando no impacto da seleção de dados na tomada de decisão algorítmica e nas consequências sociais de modelos enviesados.

## 📌 Visão Geral

O projeto explora como a curadoria inadequada de datasets pode corromper a lógica de um modelo de IA, transformando recortes parciais da realidade em regras gerais distorcidas. O foco central é o estudo do **Mecanismo do Viés**, suas **Consequências Sociais** e as estratégias de **Mitigação**.

---

## 🔍 Mecanismo do Viés

A seleção restrita de dados é a raiz da falta de diversidade em modelos de aprendizado de máquina. 

* **Treinamento Limitado:** O algoritmo observa apenas uma fração da realidade.
* **Padrões Incompletos:** O modelo assume que os dados apresentados representam a totalidade do mundo.
* **Replicação de Assimetria:** Ao priorizar certos perfis e excluir outros, o sistema gera classificações distorcidas, corrompendo sua própria lógica de decisão.

## ⚠️ Consequência Social

Modelos que operam sob vieses podem reforçar estereótipos prejudiciais, como associar vestimentas e características étnicas a padrões de beleza ("bonito" vs. "feio").

* **Estereotipagem:** Reforço de preconceitos raciais e sociais pré-existentes.
* **Impacto no Indivíduo:** Sentimento de desvalorização e invisibilidade.
* **Desigualdade Profissional:** Redução de oportunidades em contextos de contratação ou avaliação, reproduzindo injustiças históricas de forma automatizada.

## 🛠️ Ação Mitigadora: Human-in-the-Loop

Para combater essas distorções, propõe-se a abordagem **Human-in-the-loop (HITL)**, que integra a supervisão humana ao ciclo de vida da IA.

1.  **Curadoria Diversa:** Uma equipe multidisciplinar revisa e equilibra o dataset antes da implementação para garantir representatividade.
2.  **Monitoramento Ativo:** Especialistas acompanham o treinamento para identificar padrões de erro que indiquem viés.
3.  **Ajuste Contínuo:** Ao detectar problemas, o dataset é reajustado e o modelo reavaliado, unindo o processamento computacional ao julgamento crítico humano.

---

## 🎓 Contexto Acadêmico

Este trabalho faz parte dos requisitos da disciplina de **Fundamentos de Inteligência Artificial**, com o objetivo de promover o desenvolvimento de sistemas mais equitativos e éticos.
