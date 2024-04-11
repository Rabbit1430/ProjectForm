/** @format */

import { useEffect, useState, useRef } from "react";
import "./OneCircle.css";

const OneCircle = ({ data }) => {
  const RadiussmallCircle = 160;
  const Radiussmalltext = 215;
  const RadiusbigCircle = 320;
  const Radiusbigtext = 370;

  const [skills, setSkills] = useState([]);
  const [professia, setProfessia] = useState([]);
  const [bezierPaths, setBezierPaths] = useState([]);
  const [bezierPathsother, setBezierPathsother] = useState([]);
  const [areLinesVisible, setAreLinesVisible] = useState(true);
  const professionsRef = useRef([]);
  const skillsRef = useRef([]);
  const svgRef = useRef(null);

  const skiilsling = () => {
    const skilling = [];

    for (const item of data) {
      for (const headskil of item.mainSkills) {
        if (!skilling.includes(headskil)) {
          skilling.push(headskil);
        }
      }
      for (const headskil of item.otherSkills) {
        if (!skilling.includes(headskil)) {
          skilling.push(headskil);
        }
      }
    }

    setSkills(skilling);
  };

  const handleToggleLines = () => {
    setAreLinesVisible((prev) => !prev);
  };

  const namesling = () => {
    const nameling = [];

    for (const item of data) {
      if (!nameling.includes(item.name)) {
        nameling.push(item.name);
      }
    }

    setProfessia(nameling);
  };

  const selectingProfession = (indexp, name) => {
    const selectedProfession = data.find((item) => item.name === name);

    console.log(selectedProfession);

    const mski = selectedProfession.mainSkills;
    const other = selectedProfession.otherSkills;

    handleToggleLines();
    setTimeout(handleToggleLines, 200);

    const myskills = [
      ...selectedProfession.otherSkills,
      ...selectedProfession.mainSkills,
    ];

    const newSkills = [...skills];
    let replaceIndex;

    if (indexp >= 0) {
      replaceIndex = 24;
      if (indexp >= 1) {
        replaceIndex = 26;
      }
      if (indexp >= 2) {
        replaceIndex = 2;
      }
      if (indexp >= 3) {
        replaceIndex = 5;
      }
      if (indexp >= 4) {
        replaceIndex = 8;
      }
      if (indexp >= 5) {
        replaceIndex = 10;
      }
      if (indexp >= 6) {
        replaceIndex = 11;
      }
      if (indexp >= 7) {
        replaceIndex = 14;
      }
      if (indexp >= 8) {
        replaceIndex = 19;
      }
      if (indexp >= 9) {
        replaceIndex = 22;
      }
    } else {
      replaceIndex = indexp;
    }

    myskills.forEach((skill) => {
      if (replaceIndex >= newSkills.length) {
        replaceIndex = 0;
      }
      newSkills[replaceIndex] = skill;

      replaceIndex++;
    });

    setSkills(newSkills);
    updating(indexp, name, newSkills, myskills, mski, other);
  };

  const selectingSkills = (indexs, skill) => {
    const professions = [];

    const mainsprof = [];
    const othersprof = [];

    data.forEach((item) => {
      if (item.mainSkills.includes(skill) || item.otherSkills.includes(skill)) {
        professions.push(item.name);
      }
    });

    data.forEach((item) => {
      const mainprof = item.mainSkills.includes(skill);
      if (mainprof) {
        mainsprof.push(item.name);
      }
    });

    data.forEach((item) => {
      const otherprof = item.otherSkills.includes(skill);
      if (otherprof) {
        othersprof.push(item.name);
      }
    });

    const Newprofessions = [...professia];
    let replaceIndex;

    if (indexs >= 0 && indexs <= 1) {
      replaceIndex = 7;
    } else if (indexs >= 2 && indexs <= 3) {
      replaceIndex = 8;
    } else if (indexs >= 4 && indexs <= 5) {
      replaceIndex = 9;
    } else if (indexs >= 6 && indexs <= 7) {
      replaceIndex = 0;
    } else if (indexs >= 8 && indexs <= 9) {
      replaceIndex = 1;
    } else if (indexs >= 10 && indexs <= 11) {
      replaceIndex = 2;
    } else if (indexs >= 12 && indexs <= 13) {
      replaceIndex = 3;
    } else {
      replaceIndex = indexs;
    }

    professions.forEach((profession) => {
      if (replaceIndex >= Newprofessions.length) {
        replaceIndex = 0;
      }
      Newprofessions[replaceIndex] = profession;
      replaceIndex++;
    });

    // console.log(Newprofessions);

    setProfessia(Newprofessions);
    // updating(Newprofessions);
  };

  const updateCoordinate = () => {
    const skillCoords = skillsRef.current.map((ref, index) => {
      const { x, y } = ref.getBoundingClientRect();
      return {
        id: `${index}`,
        skill: skills[index],
        x: x,
        y: y,
      };
    });

    const professionCoords = professionsRef.current.map((ref, index) => {
      const { x, y } = ref.getBoundingClientRect();
      return {
        id: `${index}`,
        name: professia[index],
        x: x,
        y: y,
      };
    });

    return [skillCoords, professionCoords];
  };

  //профессия скиллы

  const updating = (indexp, name, newSkills, myskills, mski, other) => {
    const calculateBezierPath = (x1, y1, x2, y2) => {
      const midX1 = (x1 + x2) / 2;
      const midX2 = midX1;
      const midY1 = y1;
      const midY2 = y2;
      return `M${x1},${y1} C${midX1},${midY1} ${midX2},${midY2} ${x2},${y2}`;
    };
    const update = updateCoordinate();
    // console.log(update);
    const selectedProfession = update[1].find((item) => item.name == name);

    console.log(selectedProfession);

    console.log(update[1]);
    // console.log(myskills);

    const updatedCoordinates = update[0].map((coord, index) => {
      if (newSkills[index] !== undefined) {
        return {
          ...coord,
          skill: newSkills[index],
        };
      } else {
        return coord;
      }
    });

    let replaceIndexup;

    if (indexp >= 0) {
      replaceIndexup = 24;
      if (indexp >= 1) {
        replaceIndexup = 26;
      }
      if (indexp >= 2) {
        replaceIndexup = 2;
      }
      if (indexp >= 3) {
        replaceIndexup = 5;
      }
      if (indexp >= 4) {
        replaceIndexup = 8;
      }
      if (indexp >= 5) {
        replaceIndexup = 10;
      }
      if (indexp >= 6) {
        replaceIndexup = 11;
      }
      if (indexp >= 7) {
        replaceIndexup = 14;
      }
      if (indexp >= 8) {
        replaceIndexup = 19;
      }
      if (indexp >= 9) {
        replaceIndexup = 22;
      }
    } else {
      replaceIndexup = indexp;
    }

    const paths = [];

    const uniqueSkills = new Set();

    updatedCoordinates.slice(replaceIndexup).forEach((skill) => {
      if (mski.includes(skill.skill) && !uniqueSkills.has(skill.skill)) {
        const bezierPath = calculateBezierPath(
          selectedProfession.x,
          selectedProfession.y,
          skill.x,
          skill.y
        );

        paths.push(bezierPath);
        uniqueSkills.add(skill.skill);
      }
    });

    for (let i = 0; i < replaceIndexup; i++) {
      const skill = updatedCoordinates[i];
      if (mski.includes(skill.skill) && !uniqueSkills.has(skill.skill)) {
        const bezierPath = calculateBezierPath(
          selectedProfession.x,
          selectedProfession.y,
          skill.x,
          skill.y
        );
        paths.push(bezierPath);
        uniqueSkills.add(skill.skill);
      }
    }

    const pathother = [];

    updatedCoordinates.slice(replaceIndexup).forEach((skill) => {
      if (other.includes(skill.skill) && !uniqueSkills.has(skill.skill)) {
        const bezierPath = calculateBezierPath(
          selectedProfession.x,
          selectedProfession.y,
          skill.x,
          skill.y
        );

        pathother.push(bezierPath);
        uniqueSkills.add(skill.skill);
      }
    });

    for (let i = 0; i < replaceIndexup; i++) {
      const skill = updatedCoordinates[i];
      if (other.includes(skill.skill) && !uniqueSkills.has(skill.skill)) {
        const bezierPath = calculateBezierPath(
          selectedProfession.x,
          selectedProfession.y,
          skill.x,
          skill.y
        );
        pathother.push(bezierPath);
        uniqueSkills.add(skill.skill);
      }
    }

    setBezierPathsother(pathother);

    setBezierPaths(paths);
    // console.log(paths);
  };

  useEffect(() => {
    skiilsling();
    namesling();
  }, []);

  useEffect(() => {
    updating();
  }, []);

  useEffect(() => {
    if (svgRef.current) {
      const paths = Array.from(svgRef.current.getElementsByTagName("path"));
      paths.forEach((path) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
      });
    }
  }, [bezierPaths, bezierPathsother]);

  return (
    <div className="headcircle">
      {skills.map((skill, index) => {
        const angle = index * (360 / skills.length) * (Math.PI / 180);
        const x = RadiusbigCircle * Math.cos(angle);
        const y = RadiusbigCircle * Math.sin(angle);

        const angletxt = index * (360 / skills.length) * (Math.PI / 180);
        const xtxt = Radiusbigtext * Math.cos(angletxt);
        const ytxt = Radiusbigtext * Math.sin(angletxt);

        const myindex = `big-${index}`;

        return (
          <div key={myindex}>
            <div
              className="point"
              ref={(ref) => (skillsRef.current[index] = ref)}
              style={{
                left: `calc(47.8% + ${x}px)`,
                top: `calc(48% + ${y}px)`,
              }}
              onClick={() => selectingSkills(index, skill, myindex)}
            />
            <div
              className="bigtxtcircle"
              style={{
                left: `calc(49% + ${xtxt}px)`,
                top: `calc(49% + ${ytxt}px)`,
              }}
            >
              <div className="bigtxtcircle">{skill}</div>
            </div>
          </div>
        );
      })}

      <div className="twocircle">
        {professia.map((name, index) => {
          const angle = index * (360 / professia.length) * (Math.PI / 180);
          const x = RadiussmallCircle * Math.cos(angle);
          const y = RadiussmallCircle * Math.sin(angle);

          const angletxt = index * (360 / professia.length) * (Math.PI / 180);
          const xtxt = Radiussmalltext * Math.cos(angletxt);
          const ytxt = Radiussmalltext * Math.sin(angletxt);

          const myindex = `small-${index}`;

          return (
            <div key={myindex}>
              <div
                className="point1"
                ref={(ref) => (professionsRef.current[index] = ref)}
                style={{
                  left: `calc(46% + ${x}px)`,
                  top: `calc(46% + ${y}px)`,
                }}
                onClick={() => selectingProfession(index, name)}
              />
              <svg
                className="svg-container"
                width={1400}
                height={1800}
                ref={svgRef}
              >
                {bezierPaths.map((path, index) => (
                  <path
                    key={index}
                    d={path}
                    stroke="#FF7A00"
                    fill="transparent"
                    className="svg draw-animation"
                    style={{ display: areLinesVisible ? "block" : "none" }}
                  />
                ))}

                {bezierPathsother.map((path, index) => (
                  <path
                    key={index}
                    d={path}
                    stroke="#8F59B9"
                    fill="transparent"
                    className="svg draw-animation"
                    style={{ display: areLinesVisible ? "block" : "none" }}
                  />
                ))}
              </svg>

              <div
                className="smalltxtcircle"
                style={{
                  left: `calc(43% + ${xtxt}px)`,
                  top: `calc(46% + ${ytxt}px)`,
                }}
              >
                <div className="smalltxtcircle">{name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OneCircle;
