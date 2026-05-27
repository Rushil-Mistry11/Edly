import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import PopularCourses from '../components/PopularCourses'
import CategorySection from '../components/CategorySection'
import LearningSection from '../components/LearningSection'
import StatsSection from '../components/StatsSection'
import RegisterSection from '../components/RegisterSection'
import TransformSection from '../components/TransformSection'
import SubscribeSection from '../components/SubscribeSection'

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <PopularCourses />
      <LearningSection />
      <CategorySection />
      <StatsSection />
      <RegisterSection />
      <TransformSection />
      <SubscribeSection />
    </>
  )
}

export default Home