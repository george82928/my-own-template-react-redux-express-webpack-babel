pipeline {
    agent any

    triggers {
        pollScm('')
    }

    options {
        skipDefaultCheckout()
        disableConcurrentBuilds()
        timestamps()
        timeout(time: 1, unit: 'HOURS')
    }

    stages {
        stage('Pull from github') {
            steps {
            checkout scm
            }
        }
        stage('Build') {
            steps {
                sh "npm install"
                sh "npm build"
            }
        }
        stage('Test') {
            steps {
                sh "npm test:unit"
            }
        }
        stage('Deploy') {
            steps {
                echo "successful!"
            }
        }
    }
}