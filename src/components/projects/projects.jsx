import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from "../../redux/slices/projects";
import './projects.css'; 
import { ProjectCard } from "../projectCard/projectCard";
import { useLanguage } from '../../context/languageContext';
import translations from '../../translations'

export const Projects = () => {
  const [selectedType, setSelectedType] = useState('Django');

  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector(state => state.projects);
  const userData = useSelector((state) => state.auth.data);

  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleTypeClick = useCallback((type) => {
    setSelectedType(type);
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.items.filter(project => project.type === selectedType);
  }, [projects.items, selectedType]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="projects-container" id="projects">
      <div className="header">{t.projects}</div>

      <section className="projects">
        <div className="job-link-div">
          <a href="https://www.behance.net/2313209b" target="_blank" rel="noopener noreferrer" className="job-link">Мой Behance</a>
        </div>
        <div className="job-link-div">
          <a href="https://github.com/Yaroslavaaaa" target="_blank" rel="noopener noreferrer" className="job-link">Мой Git Hub</a> 
        </div>
        <div className="job-link-div">
          <a href="https://todo-final-nu.vercel.app/" target="_blank" rel="noopener noreferrer" className="job-link">Todo лист</a> 
        </div>
        <div className="job-link-div">
          <a href="https://tic-tac-toe-seven-livid.vercel.app/" target="_blank" rel="noopener noreferrer" className="job-link">Крестики-нолики</a>   
        </div>
      </section>
    </div>
  );
};
