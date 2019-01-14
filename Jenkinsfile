node {
    properties ([parameters([string(defaultValue: '', description: '请输入要发布的代码标签', name: 'GIT_TAG'),string(defaultValue: '', description: '请输入要发布的版本', name:'VERSION'), string(defaultValue: '', description: '请输入更新内容', name:'RELEASE_NOTE')])])
    if (params.GIT_TAG == '' || params.VERSION == '') {
        error '参数输入错误'
    }

    stage('UR_CMP_Front_Build') {
        checkout([$class: 'GitSCM', branches: [[name: "refs/tags/${params.GIT_TAG}"]], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'e39355c3-e173-405e-bc36-97382d427b76', url: 'git@192.168.140.131:ur-cmp/ur-cmp-front.git']]])

        dir ('ur-cmp-front') {
            def customImage = docker.build("ur-cmp/ur-cmp-front:${params.VERSION}")

            docker.withRegistry('https://hub.urplus.cn/', 'docker-registry') {
                /* Push the container to the custom Registry */
                customImage.push()
                customImage.push('latest')
            }
        }
    }

    stage('UR_CMP_Front_Deploy_Local_CI') {
        if (currentBuild.result == null || currentBuild.result == 'SUCCESS') {
            sh "ansible ciserver -a \"kubectl set image deploy/ur-cmp-front ur-cmp-front=hub.urplus.cn/ur-cmp/ur-cmp-front:${params.VERSION} -n ur-cmp\""

            mail bcc: '', body: "友普云管平台前端已部署\n持续集成环境，地址：http://ci.cecpark.net/cmp\n\n代码标签：${params.GIT_TAG}\n更新内容：\n${params.RELEASE_NOTE}\n\n注意ci.cecpark.net为自定义的主机名，在办公环境内DNS配置，需添加192.168.140.1到本机DNS服务器配置。\n----------\n本邮件为自动发送\nBy Jenkins", cc: '', from: 'jenkins@urplus.cn', replyTo: '', subject: "【CMP】前端持续集成环境已更新${params.VERSION}", to: 'ceur_all@urplus.cn'
        }
    }
}