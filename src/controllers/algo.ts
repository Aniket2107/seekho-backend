/**
 * @author Aniket Habib
 * @description Leitners Algo Controllers
 */

import { FastifyReply, FastifyRequest } from "fastify";

import Leitner from "../models/algoModel";
import Vocab from "../models/vocabModel";
import {
  initLeitner,
  postLeitner,
  getLeitnerDataParams,
  vocabType,
  leitPgLearn,
} from "../types";

export const getUserProgress = async (
  request: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply
) => {
  if (request.validationError) {
    return reply.code(400).send({
      success: false,
      msg: request.validationError.validation[0].message,
    });
  }

  if (request.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    const userProgressData = await Leitner.findOne({
      userId: request.params.userId,
    });

    if (!Object.keys(userProgressData).length) {
      return reply.code(404).send({ success: false, msg: "User not found" });
    }

    reply.code(200).send({ success: true, data: userProgressData.progress });
  } else {
    return reply.code(500).send({ success: false, msg: "Enter valid userId" });
  }
};

export const getLeitnerVocab = async (
  request: FastifyRequest<{ Params: getLeitnerDataParams }>,
  reply: FastifyReply
) => {
  if (request.validationError) {
    return reply.code(400).send({
      success: false,
      msg: request.validationError.validation[0].message,
    });
  }

  if (request.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    const leitnerData = await Leitner.findOne({
      userId: request.params.userId,
    });

    if (leitnerData) {
      const languageData = leitnerData.data.find(
        (el) => el.language === request.params.language
      );

      if (languageData) {
        const levelData = languageData.levelData.find(
          (el) => el.level === request.params.level
        );

        if (levelData) {
          let wordData: Array<vocabType> = [];

          if (levelData.learning.length !== 0) {
            let temp = await Vocab.find({
              $or: [
                {
                  _id: levelData.learning,
                },
              ],
            });

            temp.map((val) => {
              wordData.push(val);
            });
          }

          if (levelData.reviewing.length !== 0) {
            let temp = await Vocab.find({
              $or: [
                {
                  _id: levelData.reviewing,
                },
              ],
            });

            temp.map((val) => {
              wordData.push(val);
            });
          }

          if (levelData.mastered.length !== 0) {
            let temp = await Vocab.find({
              $or: [
                {
                  _id: levelData.mastered,
                },
              ],
            });

            temp.map((val) => {
              wordData.push(val);
            });
          }

          return reply.code(200).send({ success: true, data: wordData });
        }
      }
    }

    return reply.code(400).send({ success: false, msg: "No data found" });
  } else {
    return reply.code(500).send({ success: false, msg: "Enter valid userId" });
  }
};

export const getLeitnerData = async (
  request: FastifyRequest<{ Params: getLeitnerDataParams }>,
  reply: FastifyReply
) => {
  if (request.validationError) {
    return reply.code(400).send({
      success: false,
      msg: request.validationError.validation[0].message,
    });
  }

  if (request.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    const leitnerData = await Leitner.findOne({
      userId: request.params.userId,
    });

    if (leitnerData) {
      const languageData = leitnerData.data.find(
        (el) => el.language === request.params.language
      );

      if (languageData) {
        const levelData = languageData.levelData.find(
          (el) => el.level === request.params.level
        );

        if (levelData) {
          let total =
            levelData.learning.length +
            levelData.reviewing.length +
            levelData.mastered.length;
          let learningPer = (levelData.learning.length / total) * 100;
          let reviewingPer = (levelData.reviewing.length / total) * 100;
          let masteredPer = (levelData.mastered.length / total) * 100;

          const payload = {
            learningPer,
            reviewingPer,
            masteredPer,
            total,
            learningWords: levelData.learning.length,
            reviewingWords: levelData.reviewing.length,
            masteredWords: levelData.mastered.length,
            learning: levelData.learning,
            reviewing: levelData.reviewing,
            mastered: levelData.mastered,
          };

          return reply.code(200).send({ success: true, data: payload });
        }
      }
    }

    return reply.code(400).send({ success: false, msg: "Data not found.." });
  } else {
    return reply.code(500).send({ success: false, msg: "Enter valid userId" });
  }
};

export const getLeitnerProgressForLearn = async (
  request: FastifyRequest<{ Params: leitPgLearn }>,
  reply: FastifyReply
) => {
  if (request.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    const leitnerData = await Leitner.findOne({
      userId: request.params.userId,
    });

    if (leitnerData) {
      const langData = await leitnerData.data.find(
        (lg) => lg.language === request.params.lang
      );
      if (langData) {
        const progressData: Array<{
          level: string;
          progress: number;
        }> = [];

        langData.levelData.map((lvl) => {
          const level = lvl.level;
          const total =
            lvl.learning.length + lvl.reviewing.length + lvl.mastered.length;
          const masteredLength = lvl.mastered.length;
          const levelProgress = Math.floor((masteredLength / total) * 100);

          progressData.push({
            level,
            progress: levelProgress,
          });
        });

        return reply.code(200).send({ success: true, data: progressData });
      }
    }
    return reply.code(400).send({ success: false, msg: "Data not found" });
  } else {
    return reply.code(500).send({ success: false, msg: "Enter valid userId" });
  }
};

export const initializeLeitner = async (
  request: FastifyRequest<{ Body: initLeitner }>,
  reply: FastifyReply
) => {
  if (request.validationError) {
    return reply.code(400).send({
      success: false,
      msg: request.validationError.validation[0].message,
    });
  }

  if (request.body.userId.match(/^[0-9a-fA-F]{24}$/)) {
    const userExists = await Leitner.findOne({ userId: request.body.userId });

    const vocabData = await Vocab.find({
      language: request.body.language,
      level: request.body.level,
    });
    let vocabIds: Array<string> = [];
    vocabData.map((dt) => vocabIds.push(String(dt._id)));

    if (userExists === null) {
      const payload = {
        userId: request.body.userId,
        data: [
          {
            language: request.body.language,
            levelData: [
              {
                level: request.body.level,
                learning: vocabIds,
                reviewing: [],
                mastered: [],
              },
            ],
          },
        ],
      };

      let newLeitner = new Leitner(payload);

      let savedLeitner = await newLeitner.save();

      if (!savedLeitner) {
        return reply
          .code(500)
          .send({ success: false, msg: "Something went wrong, Try again" });
      }

      return reply
        .code(200)
        .send({ success: true, msg: "Language initialized" });
    }

    const languageExists = await userExists.data.find(
      (el) => el.language === request.body.language
    );

    if (languageExists === undefined) {
      const payload = {
        language: request.body.language,
        levelData: [
          {
            level: request.body.level,
            learning: vocabIds,
            reviewing: [],
            mastered: [],
          },
        ],
      };
      userExists.data.push(payload);

      await userExists.updateOne(userExists);
      return reply.code(200).send({ success: true, msg: "Language added" });
    }

    const levelData = await languageExists.levelData.find(
      (el) => el.level === request.body.level
    );

    if (levelData === undefined) {
      const payload = {
        level: request.body.level,
        learning: vocabIds,
        reviewing: [],
        mastered: [],
      };

      languageExists.levelData.push(payload);

      await userExists.updateOne(userExists);
      return reply.code(200).send({ success: true, msg: "Level added" });
    }

    return reply
      .code(404)
      .send({ success: false, msg: "No data found to be updated" });
  } else {
    return reply.code(500).send({ success: false, msg: "Enter valid userId" });
  }
};

export const postLeitnerData = async (
  request: FastifyRequest<{ Body: postLeitner }>,
  reply: FastifyReply
) => {
  if (request.validationError) {
    return reply.code(400).send({
      success: false,
      msg: request.validationError.validation[0].message,
    });
  }

  if (request.body.userId.match(/^[0-9a-fA-F]{24}$/)) {
    const leitnerData = await Leitner.findOne({ userId: request.body.userId });

    if (leitnerData) {
      const languageData = await leitnerData.data.find(
        (el) => el.language === request.body.language
      );

      if (languageData) {
        const levelData = await languageData.levelData.find(
          (el) => el.level === request.body.level
        );

        if (levelData) {
          const handleRight = (wordId: string) => {
            let word1 = levelData.learning.find((el) => el === wordId);
            let word2 = levelData.reviewing.find((el) => el === wordId);

            if (word1 !== undefined) {
              levelData.learning = levelData.learning.filter(
                (el) => el !== wordId
              );
              levelData.reviewing.push(wordId);
              return;
            }

            if (word2 !== undefined) {
              levelData.reviewing = levelData.reviewing.filter(
                (el) => el !== wordId
              );
              levelData.mastered.push(wordId);
              return;
            }
          };

          const handleWrong = (wordId: string) => {
            let word2 = levelData.reviewing.find((el) => el === wordId);
            let word3 = levelData.mastered.find((el) => el === wordId);

            if (word2 !== undefined) {
              levelData.reviewing = levelData.reviewing.filter(
                (el) => el !== wordId
              );
              levelData.learning.push(wordId);
              return;
            }

            if (word3 !== undefined) {
              levelData.mastered = levelData.mastered.filter(
                (el) => el !== wordId
              );
              levelData.reviewing.push(wordId);
              return;
            }
          };

          const todaysDate = new Date().getDate();
          const todaysMonth = new Date().getMonth();
          const todaysYear = new Date().getFullYear();

          if (request.body.status === 1) {
            handleRight(request.body.wordId);

            //Managed progress here:-- ;)
            const progressExists = leitnerData.progress.find((pg) => {
              const ud = new Date(`'${pg.date}'`);
              const d1: number = ud.getDate();
              const m1: number = ud.getMonth();
              const y1: number = ud.getFullYear();
              return (
                d1 === todaysDate &&
                m1 === todaysMonth &&
                y1 === todaysYear &&
                pg.language === request.body.language
              );
            });

            const currMastered = levelData.mastered.length;
            const previousMasteredData = leitnerData.totalWordsLearned.find(
              (el) => el.language === request.body.language
            );
            const previousMastered = previousMasteredData.totalMastered;

            const diff =
              currMastered > previousMastered
                ? currMastered - previousMastered
                : previousMastered - currMastered;

            if (progressExists !== undefined) {
              progressExists.wordsLearned = diff + previousMastered;
            } else {
              const payload = {
                language: request.body.language,
                date: new Date(),
                wordsLearned: 0,
              };

              leitnerData.progress.push(payload);
            }
          } else {
            handleWrong(request.body.wordId);

            const progressExists = leitnerData.progress.find((pg) => {
              const ud = new Date(`'${pg.date}'`);
              const d1 = ud.getDate();
              const m1 = ud.getMonth();
              const y1 = ud.getFullYear();
              return (
                d1 === todaysDate &&
                m1 === todaysMonth &&
                y1 === todaysYear &&
                pg.language === request.body.language
              );
            });

            const currMastered = levelData.mastered.length;
            const previousMasteredData = leitnerData.totalWordsLearned.find(
              (el) => el.language === request.body.language
            );
            const previousMastered = previousMasteredData.totalMastered;

            const diff =
              currMastered > previousMastered
                ? currMastered - previousMastered
                : previousMastered - currMastered;

            if (progressExists !== undefined) {
              progressExists.wordsLearned = previousMastered - diff;
            } else {
              const payload = {
                language: request.body.language,
                date: new Date(),
                wordsLearned: 0,
              };

              leitnerData.progress.push(payload);
            }
          }

          await leitnerData.updateOne(leitnerData);

          return reply.code(200).send({ success: true, msg: "Data updated!" });
        }
      }
    }

    return reply
      .code(404)
      .send({ success: false, msg: "Something went wrong, Try again" });
  } else {
    return reply.code(500).send({ success: false, msg: "Enter valid userId" });
  }
};
