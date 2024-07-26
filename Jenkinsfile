pipeline {
    
    agent any

    environment {
        NODE_ENV = 'test'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Merge Check') {
            steps {
                script {
                    def gitStatus = sh(returnStdout: true, script: 'git status').trim()
                    if (gitStatus.contains('CONFLICT')) {
                        error('Merge conflicts detected!')
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Unit Tests') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Run E2E Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
    
    post {
        success {
            script {
                echo 'All tests passed, merge request can be approved.'
            }
        }
        failure {
            echo 'Tests failed, merge request cannot be approved.'
        }
    }
}
